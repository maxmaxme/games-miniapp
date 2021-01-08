import {IOS, platform} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

export function doHaptic(force = false) {
  if (force || platform() === IOS) {
    bridge.send("VKWebAppTapticSelectionChanged", {});
  }
}
