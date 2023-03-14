JUICYDEMO
=========

Play it [here!](https://istarnion.github.io/JUICYDEMO/)

A simple demo game to show various "juicy" effects to (hopefully) improve the feel of the game, and to elevate a prototype to something that feels better and more complete.

Greatly inspired by this [2012 talk](https://www.youtube.com/watch?v=Fy0aCDmgnxg) by Martin Jonasson and Petri Purho.

I originally made this for a workshop with students at Nord Universitet in Levanger, Norway, 15th of March, 2023

## Controls
This game was made for use during presentations, so there is no menu or instructions in game.

- WASD or arrow keys to move
- Aim with the mouse
- Fire with left mouse button (you can hold the buttom down)
- Press M to get more juice
- Press L to get less juice
- 0 to remove all juice
- J to add all juice


## Levels of juice
The effects added are not in a prioritized order, rather in the order it would seem most incremental in the demonstration.

1. Cool gun. The game is about shooting, so the thing that shoots has to be interesting. In this game it was hard for me to make the _player_ interesting, but we could spice up the gun a little.

2. More shooting. Again, this game is about shooting, so it always good to try to add more of the core mechanic. Sometimes less is more, but you never know until you know what "more" is.

3. Visualization. Not really juice, but it is very important to somehow visualize to the player what's going on. Give the players a way to understand the game so they can take informed decisions, rather than speculate and rely on assumptions.

4. Sound effects. The most powerful and most bang-for-the-bucks juice ever. For the programmer at least. They can be hard to make, but even placeholder SFX lifts a game prototype up high.

5. Particles. Mother of Juice. Particles are (after sound) the easiest way to tell the player that something just happened. This is critical feedback. Every interaction should spawn particles. They also have the benefit that they work for deaf players and those who play without sound.

6. Animations. This is harder to generalize, but animating everything you can in some way makes the game feels super juicy. With just a wobble that is very simple for programmers to implement you add no artist workload, but add tons to the game.

7. Screenshake. The simplest, and both overused and underutilized. I went a bit crazy here, but adding small shake effects on every impact is great. For actual games it is good to let the player scale back the effect (all the way to zero), because it can make some people motion sick.

8. Colors. This can be a hard one, but finding a simple color palette to use instead of using just "programmer-default colors" (such as #FF0000 or #FF00FF) makes a big difference. In many cases, especially in 3D it is infinitely better than just using white textures as well.

9. Music. This can be as simple or complex as you like. Dynamic phasing in and out layers of sound based on the context is amazing, and never-repeating patterns, smooth fading between tracks without breaking rhythm is super cool. But simple loops works great as well, especially for a prototype.

10. MORE PARTICLES. Go hard or go home. Just because we have used one trick once does not mean it is spent.

11. UI animation. In order to bring the players attention to changes in the UI, such as score increase, damage takes, etc, it works wonders to flash, shake, bounce, or in some other way animate the UI.

12. CRAZY. I added this layer just for fun, to take it over the top. The flashing background is probably not a good idea, theres (if possible) too many particles, and the enemies spawn faster. You can have too much of a good thing, but it is valuable to go there and then scale back, so you can find the correct balance for your game.


## Some effects I didn't show in the demo but are super important
1. Tweening. Often in games we move stuff. It can be handy to use code such as `lerp(start, end, t)`, where t increases some amount every frame and goes between 0 and 1. But this moves stuff at a constant speed, meaning there's is a jerk at the start, and a hard collision at the end. Instead, use an easing library, or wrap `t` in an easing function such as `function ease(t) { return 3*t*t-2*t*t*t; }` which will give you a smooth start and stop. There's many such functions out there, and everyone uses them.
Another trick is to move towards your target by moving a percentage of the way every frame, like `x = x + (target - x) * 0.1`. This gives you a slowdown as you approach the target which can look nice.
This is not only for positions, but can and should also be used for scale, rotation, and sometimes color.

2. Squash and stretch. This is something the animators are good at, but often is easy for the programmer to do as well, and can be made so that the animators don't have to redraw as many animations if the concept of a character changes. Use some kind of easing function and increase scale in the direction something travels, and decrease scale in the perpendicular direction. In 3D you have two perpendicular directions that can be hard to find. In that case, just stretching in the direction of travel can be good enough.

