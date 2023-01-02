import {
  Dispatch,
  useEffect,
  useState,
  MutableRefObject,
  SetStateAction,
} from "react";

export const useIsVisible = (ref: MutableRefObject<HTMLElement | null>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    ref.current && observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

export const useValidatedInput = (
  predicate: (text: string) => boolean
): [string, Dispatch<SetStateAction<string>>, boolean] => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(predicate(value));
  }, [value, predicate]);

  return [value, setValue, isValid];
};
