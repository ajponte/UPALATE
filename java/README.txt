### Note after finishing tutorial (7/21 15:00) by Chris ###

This tutorial was very useful in understanding the basic structure of a RestAPI and made using Java EE, using Jersey as its WS-JAX module.
The author admits that in order to make the tutorial more simple he has sacrificed modularity. Obviously our API will be more complex and much more modularized. In this manner I think
it would be great if we tried to abstract everythign as much as possible so as to easily edit or switch modules in the future (:: avoid future technical debt as much as possible).
I also think it would be good to implement a very basic and simple locale class for any kind of returned strings, so as to easily translate our API in the future and so that we don't
have to retype similar strings all the time; we don't have to actually implement multilingual features for now, but just include it in the skeleton.
Perhaps we should all agree on naming conventions for variables, class names and API paths. I followed the tutorial and tried to make minor edits so that it was a basic UPalate api, not
a PC_PARTS api as in the tutorial. Looking at the whole thing now it's obvious that it is a big mess with inconsistent naming and syntax, but I will be next working on a clean skeleton
that we can actually work on top of.

As for security, the author of the tutorial mentioned ESAPI briefly and explains why he did not include it in the tutorial. I think it's unncessary to go over that in the tutorial and
that we can implement our own security. On a side note we do need to quickly decide on a logging class/module to output to console. I like to use grep along with my Weblogic start command
to catch all the logs I output (e.g., grep "UPALATE LOG").

This tutorial uses Jersey 1.17 but it'd be a good idea to use the latest version (2.9), same with esapi etc.


PS: I did not edit the delete.html and put.html, the javascript the author included is messy and I think it's pretty straightforward. I've personally been doing ajax with PrototypeJS and
jQuery for a long time and that'll be pretty easy to implement, will the frontend team be taking care of that part? (i'm not very experienced with AngularJS etc)
