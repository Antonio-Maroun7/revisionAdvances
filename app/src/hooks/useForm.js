import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useForm - reusable hook that manages the state of a form.
 *
 * Like useFetch (which manages data / loading / error for a GET request),
 * useForm manages values / loading / error for a form submission.
 *
 * @param {object} initialValues - starting values of the form fields
 * @param {function} onSubmit - async callback receiving the current values
 */
const useForm = (initialValues = {}, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Refs keep the latest props without re-creating the callbacks (no stale
  // values, no useEffect loops in the consuming component).
  const initialValuesRef = useRef(initialValues);
  const onSubmitRef = useRef(onSubmit);
  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  // A ref is updated synchronously, so a fast double click cannot submit twice
  // (state updates are asynchronous).
  const isSubmittingRef = useRef(false);

  // Generic handler: updates the field matching the input's "name".
  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setValues((previousValues) => ({
      ...previousValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault();
      if (isSubmittingRef.current) return;

      try {
        isSubmittingRef.current = true;
        setLoading(true);
        setError("");
        await onSubmitRef.current?.(values);
      } catch (submitError) {
        // Exposed through `error` so the component can display it.
        setError(submitError.message);
      } finally {
        isSubmittingRef.current = false;
        setLoading(false);
      }
    },
    [values],
  );

  // Without arguments: back to the initial values.
  // With newValues (e.g. an existing record): reset to those, and remember
  // them as the new "initial" values.
  const resetForm = useCallback((newValues) => {
    if (newValues) {
      initialValuesRef.current = newValues;
    }
    setValues(initialValuesRef.current);
    setError("");
  }, []);

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
    resetForm,
    loading,
    error,
    setError,
  };
};

export default useForm;
