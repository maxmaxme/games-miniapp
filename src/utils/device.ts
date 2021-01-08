import {IOS, platform} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

export function doHaptic() {
  if (platform() === IOS) {
    bridge.send("VKWebAppTapticSelectionChanged", {});
  }
}
