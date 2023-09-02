import { computed, Ref, unref } from 'vue';

import useEventListener from './useEventListener';

export interface HotKeyInfo {
  hotKey: (string | string[])[];
  directions?: string;
  onKeyPressed: () => void;
  pause: () => void;
  unpause: () => void;
  removeListener: () => void;
}

export interface HotKeyOptions {
  target: Ref<EventTarget> | EventTarget;
  directions: string;
  shiftKey: boolean;
  ctrlKey: boolean;
  exact: boolean; // 当 exact 设置为 true 时，表示在判断快捷键是否匹配时，不仅要考虑按下的按键是否匹配，还需要考虑是否同时满足 Ctrl 键和 Shift 键的状态
}

export const useHotKey = (
  key: string | string[],
  onKeyPressed: () => void | (() => void),
  opts?: Partial<HotKeyOptions>
): HotKeyInfo => {
  const target = opts?.target ?? window;
  const isMacOS = navigator.userAgent.toLowerCase().includes('mac');
  let paused: boolean = false;

  const hotKey = computed(() => {
    const options = opts || {};
    const keyCombination = [];

    if (options.ctrlKey) keyCombination.push(isMacOS ? 'Cmd' : 'Ctrl');
    if (options.shiftKey) keyCombination.push(isMacOS ? 'Option' : 'Shift');
    keyCombination.push(key);

    return keyCombination;
  });
  const removeListener = useEventListener(target, 'keydown', (event) => {
    const options = opts || {};
    if (paused) {
      return;
    }
    key = typeof key === 'string' ? [key] : key;
    if (key.includes(event.key.toLowerCase()) && matchKeyScheme(options, event)) {
      event.preventDefault();
      const result = onKeyPressed();
      if (typeof result !== 'function') {
        return;
      }
      const targetElement: EventTarget = unref(target);
      const handleKeyup = (event: Event) => {
        event.preventDefault();
        result();
        targetElement.removeEventListener('keyup', handleKeyup);
      };
      targetElement.addEventListener('keyup', handleKeyup);
    }
  });
  return {
    hotKey: hotKey.value,
    directions: opts?.directions,
    onKeyPressed,
    removeListener,
    pause: () => (paused = true),
    unpause: () => (paused = false),
  };
};

const matchKeyScheme = (
  opts: Pick<Partial<HotKeyOptions>, 'shiftKey' | 'ctrlKey' | 'exact'>,
  event: KeyboardEvent
): boolean => {
  const ctrlKey = opts.ctrlKey ?? false;
  const shiftKey = opts.shiftKey ?? false;
  if (opts.exact) {
    return (ctrlKey === event.metaKey || ctrlKey === event.ctrlKey) && shiftKey === event.shiftKey;
  }
  const satisfiedKeys: boolean[] = [];
  satisfiedKeys.push(ctrlKey === event.metaKey || ctrlKey === event.ctrlKey);
  satisfiedKeys.push(shiftKey === event.shiftKey);
  return satisfiedKeys.every((item) => item);
};

export default useHotKey;
