import { createActionType } from 'action-types-creator';

const types = {
    root: ['RESET'],
    login: [
        'login',
        '_SUBMIT_', 'PRELOAD'
    ],
    user: [
        'change_credit',
        'LIST_LOADED', 'LIST_ERROR', '_CHANGE_CREDIT_'
    ],
    widgets: [
        '_LOAD_'
    ]
};

const o = createActionType(types);

// export each action type
for(const item in o) {
    exports[item] = o[item];
}
