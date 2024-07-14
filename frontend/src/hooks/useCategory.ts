import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ThunkPromise } from "@apptypes/shared";
import { Category } from "@apptypes/category";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { status, error, records } = useAppSelector((state) => state.categories);

  useEffect(() => {
    let promise: ThunkPromise<Category[]>;

    if (records.length === 0) promise = dispatch(actGetCategories());

    return () => {
      if (promise) {
        promise.abort();
      }
    };
  }, []);

  return { records, status, error };
};

export default useCategories;
