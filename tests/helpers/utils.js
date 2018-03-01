export function positionClasses(tooltip) {
  return tooltip.getAttribute('class').split(/\s+/).filter(name => {
    return /is-(north|south|east|west)/.test(name);
  });
}
