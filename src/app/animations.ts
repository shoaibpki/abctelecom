import { animate, keyframes, query, stagger, state, style, transition, trigger } from "@angular/animations";

export const slideRightDefault = trigger('slideRight',[
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateX(-100%)' }),
            stagger(400,[animate('300ms 2s ease-out',
                keyframes([
                    style({
                        opacity: 1,
                        transform: 'translateX(0%)'
                    })
                ]))])
        ], { optional: true })
    ]),
]);
export const slideTopDefault = trigger('slideTop',[
    transition('* => *', [
        query(':enter',[style({
            opacity: 0,
            transform: 'translateY(-100%)'
            }),
            stagger(400,[animate('300ms ease-out',
                keyframes([style({
                    opacity: 1,
                    transform: 'translateY(0%)'
                })]))                
            ])
        ], { optional: true })
    ]),
]);
export const showServiceState = trigger('showService',[
    state('hidden', style({ height: '30px'})),
    state('showed', style({ height: '113px'})),
    transition('hidden => showed', animate(
        '300ms ease-out',
        keyframes([
            style({ height: '113px'})
        ])
    )),
    transition('showed => hidden', animate(
        '300ms ease-in',
        keyframes([
            style({ height: '30px'})
        ])
    ))
]);
export const fadeEffectState = trigger('fadeEffect',[
    transition(':enter', [
        style({ opacity: 0}),
        animate('300ms')
    ]),
    // transition(':leave', 
    //     animate(100, style({opacity: 0}))
    // )
]);
export const deleteSlideRightState = trigger('deleteSlideRight',[
    transition(':enter', [
        animate('300ms ease-in',keyframes([
            style({ transform: 'translateX(-100%)', offset: 0 }),        
            style({ transform: 'translateX(-15%)', offset: 0.4 }),
            style({ opacity: 0, transform: 'translateX(0%)', offset: 1 })
        ]))
    ]),
    transition(':leave', [
        animate('300ms ease-in',keyframes([
            style({ transform: 'translateX(0%)', offset: 0 }),        
            style({ transform: 'translateX(-15%)', offset: 0.4 }),
            style({ opacity: 0, transform: 'translateX(100%)', offset: 1 })
        ]))
    ])
]);
export const selectRecordState = trigger('selectRecord',[
    // state('default',style({ backgroundColor: 'lightgray' })),
    // state('selected', style({ backgroundColor: 'lightblue'})),
    transition('default => selected',[
        // style({ transform: 'scale(1.02)'}),
        style({ opacity: 0 }),
        animate('500ms ease-out')
    ]),
    transition('selected => default',[
        style({}),
        animate('500ms ease-out')
    ])

]);

export const inputFocusState = trigger('inputFocus',[
    transition('* => *',[
        query('.ng-valid:focus',[
            animate(300, style({ border: '1px solid black' }))
        ], { optional: true })
    ]),
]);

export const modalEffectState = trigger('modalEffect', [
    transition('hidden => showed',[
        style({ transform: 'scale(0.7)' }),
        animate(300)
    ])
]);

export const serviceDetailState = trigger('serviceDetail',[
    state('hidden', style({ height: '62px'})),
    state('shown', style({ height: '400px'})),
    transition('hidden => shown', animate(
        '500ms ease-out',
        keyframes([
            style({ height: '400px'})
        ])
    )),
    transition('shown => hidden', animate(
        '500ms ease-in',
        keyframes([
            style({ height: '62px'})
        ])
    ))
])