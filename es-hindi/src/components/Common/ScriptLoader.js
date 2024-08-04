import { useEffect } from "react";
import { scriptLoader } from "includes/article.util";
import useLoad from "hooks/useLoad";

export default function ScriptLoader({ src }) {
  const [load] = useLoad();

  useEffect(() => {
    if (load) {
      // setTimeout(() => {
      scriptLoader(src);
      // }, 1500);
    }
  }, [load]);

  return null;
}
