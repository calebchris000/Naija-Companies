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
        console.log("Element is intersecting");
        callback(true);
      } else {
        callback(false);
        console.log("Element is not intersecting");
      }
    });
  });

  console.log(selected_element);

  if (selected_element) {
    observer.observe(selected_element as HTMLElement);
  } else {
    callback(false);
  }
};
