import { Class } from '../mixin/index';
import { css, Dimensions, isVisible } from '../util/index';

export default function (UIkit) {

    UIkit.component('cover', {

        mixins: [Class, UIkit.components.video.options],

        props: {
            width: Number,
            height: Number
        },

        defaults: {
            automute: true
        },

        ready() {

            if (this.$el.tagName === 'IFRAME') {
                css(this.$el, 'pointerEvents', 'none');
            }

        },

        update: {

            write() {

                var el = this.$el;

                if (!isVisible(el)) {
                    return;
                }

                var {offsetHeight: height, offsetWidth: width} = el.parentNode;

                css(
                    css(el, {width: '', height: ''}),
                    Dimensions.cover(
                        {
                            width: this.width || el.clientWidth,
                            height: this.height || el.clientHeight
                        },
                        {
                            width: width + (width % 2 ? 1 : 0),
                            height
                        }
                    )
                );

            },

            events: ['load', 'resize']

        },

        events: {

            loadedmetadata() {
                this.$emit();
            }

        }

    });

}
