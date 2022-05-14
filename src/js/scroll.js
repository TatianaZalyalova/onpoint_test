const container = document.getElementById("scrollbar-container");
const content = document.getElementById("content");
const scroll = document.getElementById("scrollbar");

const eventScroll = new Event("scroll");

content.addEventListener("scroll", (e) => {
  scroll.style.height = `${
    (container.clientHeight * content.clientHeight) / content.scrollHeight
  }px`;
  scroll.style.top = `${
    (container.clientHeight * content.scrollTop) / content.scrollHeight
  }px`;
});

scroll.addEventListener("touchstart", (start) => {
  const y = scroll.offsetTop;

  const onMove = (end) => {
    const delta = end.changedTouches[0].pageY - start.changedTouches[0].pageY;

    scroll.style.top = `${Math.min(
      container.clientHeight - scroll.clientHeight,
      Math.max(0, y + delta)
    )}px`;
    content.scrollTop =
      (content.scrollHeight * scroll.offsetTop) / container.clientHeight;
  };
  document.addEventListener("touchmove", onMove);

  document.addEventListener("touchend", () => {
    document.removeEventListener("touchmove", onMove);
  });
});

window.addEventListener(
  "resize",
  content.dispatchEvent.bind(content, eventScroll)
);
content.dispatchEvent(eventScroll);

scroll.addEventListener("mousedown", (start) => {
  start.preventDefault();
  const y = scroll.offsetTop;
  const onMove = (end) => {
    const delta = end.pageY - start.pageY;
    scroll.style.top = `${Math.min(
      container.clientHeight - scroll.clientHeight,
      Math.max(0, y + delta)
    )}px`;
    content.scrollTop =
      (content.scrollHeight * scroll.offsetTop) / container.clientHeight;
  };
  document.addEventListener("mousemove", onMove);

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", onMove);
  });
});
