import PocketBase from 'pocketbase';
import { PB_URL } from '$env/static/private';


export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase(PB_URL);

  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
  } catch (_) {
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

  return response;
}