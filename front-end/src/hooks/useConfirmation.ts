export const useConfirmation = () => {
  const confirm = (options: { title?: string; message?: string } | string = {}) => {
    let title: string;
    let message: string;

    if (typeof options === "string") {
      title = "Confirmation";
      message = options;
    } else {
      title = options.title || "Confirmation";
      message = options.message || "Are you sure you want to proceed?";
    }

    const confirmMessage = `${title}\n\n${message}`;
    return window.confirm(confirmMessage);
  };

  return { confirm };
};
