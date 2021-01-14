export function isWeb(): boolean {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('vk_platform') === 'desktop_web';
}
