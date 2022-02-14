// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {};
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "contact_step"
    | "cv_step"
    | "cv_step.select_cv"
    | "cv_step.uploading"
    | "cv_step.uploaded"
    | "cv_step.manual_cv"
    | "cv_step.complete_cv"
    | "application_detail_step"
    | "success_step"
    | {
        cv_step?:
          | "select_cv"
          | "uploading"
          | "uploaded"
          | "manual_cv"
          | "complete_cv";
      };
  tags: never;
}
