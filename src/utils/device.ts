import {IOS, platform} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

export function doHaptic(force = false) {
  if (force || platform() === IOS) {
    if (bridge.supports('VKWebAppTapticSelectionChanged')) {
      bridge.send("VKWebAppTapticSelectionChanged", {});
    }
  }
}
