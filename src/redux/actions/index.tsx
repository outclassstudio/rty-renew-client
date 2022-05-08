export const IS_THEMA_MODAL = "IS_THEMA_MODAL";

export function isThemaModal(boolean: boolean) {
  return {
    type: IS_THEMA_MODAL,
    payload: {
      boolean,
    },
  };
}
