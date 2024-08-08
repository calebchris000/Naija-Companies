export const isIntersecting = (
  element: HTMLElement | string,
  callback: (b: boolean) => void,
) => {
  let selected_element = element;
  if (typeof element === "string") {
    selected_element = document.querySelector(element) as HTMLElement;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(true);
      } else {
        callback(false);
      }
    });
  });

  if (selected_element) {
    observer.observe(selected_element as HTMLElement);
  } else {
    callback(false);
  }
};
