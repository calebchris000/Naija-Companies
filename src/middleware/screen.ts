import { store } from "@src/lib/store";

export const Screen = () => {
    handleResize()
}

export const handleResize = () => {
  const { innerWidth } = window;

  if (innerWidth >= 768 && innerWidth <= 1024) {
    store.update((c) => {
      c.device = "tablet";
      return c;
    });
    console.log("tablet");

  } else if (innerWidth > 1024 && innerWidth <= 1200) {
    store.update((c) => {
      c.device = "large-tablet";
      return c;
    });
  } else if (innerWidth > 1200) {
    store.update((c) => {
      c.device = "desktop";
      return c;
    });
    console.log("desktop");

  } else {
    store.update((c) => {
      c.device = "mobile";
      return c;
    });
    console.log("mobile");
    
  }
};
