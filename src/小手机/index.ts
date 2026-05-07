import { createScriptIdDiv, teleportStyle } from '@util/script';
import App from './App.vue';

$(() => {
  const vueApp = createApp(App).use(createPinia());

  const $app = createScriptIdDiv().appendTo('body');
  vueApp.mount($app[0]);

  const { destroy } = teleportStyle();

  $(window).on('pagehide', () => {
    vueApp.unmount();
    $app.remove();
    destroy();
  });
});
