const Loading = (_props: { percent?: number }) => null;

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  setLoading(100);

  function clear() {
    setLoading(100);
  }

  function loaded() {
    return Promise.resolve(100);
  }

  return { loaded, percent: 100, clear };
};;
