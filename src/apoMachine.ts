import { assign, createMachine, spawn } from "xstate";

const block = createMachine({
    id: "block",
    initial: "ini",
    states: {
        ini: {
            on: {
                NEXT: {
                    target: "dos",
                },
            },
        },
        dos: {},
    },
});

const machine =
    /** @xstate-layout N4IgpgJg5mDOIC5QEMAOB7AdAY3QOwBdlsCB9WAsVAYgDkBRADQBVFQNYBLAz-NkAB6IAjADYA7JgCsAFnGiAzOICcC5TKkLhAJgA0IAJ6JxMzDKXKAHJe2WdUgL4P9aLNgBu5SqkywwAGzASUg9qAGV6ABl6AGFmUgAxAElo-g5uXjx+IQRhdUxhcXEdGQAGbQVzcSl9IwQNBUxShW1lCRlRTvLhGScXDBxPCipfAKCyUIjouNIAWQBBWgBVeci09C4ePiRBEXzC4u0yiqqaw0QpQqaWqxlzYVKpUV7nEFdBrxGAV1R-dGQIJw8FBqAIKMhKJhkAAzSgAJwKpSR602mWyFyRTSRilKikuMmUwjOdQa11a7U6om6L36biG3kwAFtkHgvsh-CF3HQmKwduktlkdjkpJikbiFOL8YTiRcrs1WpY7lpHs8+m8Bh5PjQIPgwL4iJD3prhqgURltqAcjZSk1xJZxEpRE9LlIZfVRMpMFo1HZLKVreY1e80L9ONgIZlSBAwEROByTZgAEbofwAC2Q1HoADUlmaBejcrZhJhFHcpBUekdFbVEASpAU-dondoVOXHi9Xnh0NH4DsjfgiMETXm0ULa3pzghFZhisokU3tLZyz0gxr6SM-IFgh4RxbdlPxDX3ZYZ9pmsItNYZDpOqu6VrMD8-gCgVBd4LLYgFJZRJgrG0lVKcRymvN0Okab0rGEP0AwUO8PgTJ9-mjCB3wLTpJCUJ57hMUpVFEI9wK9C8oJgs9A1eI11x8ZlWXZTk0LHBBv1-f9nnMICQKJI9y0wkirCKJspB-eDjQZXBGV+GMwAYvkNnND99wwr1qmeLRcPwniW2ItQBPEISRMotctUYz8EEUI9vxteU2ksV0bGURd4JDfwwwjfAoxjZA4wfZM02QUz9weVRMCOKsjmvFRCLaJofxFWdtDyB5HCMrAXLcgVPNjeMGXQThApyHo8hLaoiSeNRnhsaL6xFbRl3UC9-UsZzUFDcNMujbKTLk1E90K3FPTCmQbDuQplEIxcG3KJ5LBaYRoNxeDYC+bBsDgWBuvYeT8yYmQJzqC9JCJD05zna9qTvAqREsI9iyqZQVFm785HK5qnAcIA */
    createMachine(
        {
            tsTypes: {} as import("./apoMachine.typegen").Typegen0,
            schema: {
                context: {} as { value: string; blockRef: string },
                events: {} as
                    | { type: "NEXT" }
                    | { type: "ADD" }
                    | { type: "SELECT_FILE" }
                    | { type: "SELECT_MANUAL" },
            },
            context: { value: "", blockRef: "" },
            id: "apo",
            initial: "contact_step",
            states: {
                contact_step: {
                    on: {
                        NEXT: {
                            target: "#apo.cv_step",
                        },
                    },
                    entry: assign({ blockRef: () => spawn(block) }),
                },
                cv_step: {
                    initial: "select_cv",
                    states: {
                        select_cv: {
                            on: {
                                SELECT_FILE: {
                                    target: "#apo.cv_step.uploading",
                                },
                                SELECT_MANUAL: {
                                    target: "#apo.cv_step.manual_cv",
                                },
                            },
                        },
                        uploading: {
                            after: {
                                "1000": {
                                    target: "#apo.cv_step.uploaded",
                                },
                            },
                        },
                        uploaded: {
                            type: "final",
                        },
                        manual_cv: {
                            on: {
                                NEXT: {
                                    target: "#apo.cv_step.complete_cv",
                                },
                            },
                        },
                        complete_cv: {
                            type: "final",
                        },
                    },
                    onDone: {
                        target: "#apo.application_detail_step",
                    },
                },
                application_detail_step: {},
                success_step: {},
            },
        },
        {
            actions: {},
        }
    );
