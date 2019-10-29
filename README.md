# Reflex-flow
A javascript data flow management library for Single Page Application (SPA)

### Install

    npm i reflex-flow

### API

 - subscribe
 - dispatch
 - stream_register
 - toggleNeurons
 - stickers (attachCallback)

## subscribe
You can subscribe a linkedlist of events and actions.
It takes two parameters 

    reflexes.subscribe(handlers, "basic_actions");

 - handlers - *func*
 - handler_name - *string*


## dispatch
dispatch an action and it's side-effects will be run which are mentioned in its handlers

    reflexes.dispatch({id: "PINCH_ALERT", sender_name: name, sender_email:email, message_to_send:msg});


## stream_register
stream_register lets you register a global event to a handler

    reflexes.stream_register(sensors, "click", "view_clicks");

## toggleNeurons
toggleNeurons are called when you have to perform a exception like hidding a menu on click on anything but that menu.

    reflexes.addTogglers(toggleNeurons, "views_togglers");

## stickers
When you have to attach a callback for a particular event like rendering on data_load, then we use stickers

    reflexes.attachCallback("RENDER_PAGE", "DATA_LOADED");


### more use cases and ideology coming soon....
