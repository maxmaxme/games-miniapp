export function transformActivePanel(panel: string, defaultPanel: string, panels: object) {
  if (!Object.values(panels).includes(panel)) {
    panel = defaultPanel;
  }
  return panel;
}
