import { useLoader } from "../../context/loaderContext";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./loader.css";


export default function TopLoader() {
  const { isLoading } = useLoader();

  useEffect(() => {
    if (isLoading) NProgress.start();
    else NProgress.done();
  }, [isLoading]);

  return null;
}

