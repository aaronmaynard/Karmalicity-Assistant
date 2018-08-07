# Karmalicity-Assistant
A karmalicity viewing assistant for autonomous point generation.

## Testing
The directory holding the manifest file can be added as an extension in developer mode in its current state.

1. Open the Extension Management page by navigating to chrome://extensions.
 - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the LOAD UNPACKED button and select the extension directory.

![](https://developer.chrome.com/static/images/get_started/load_extension.png)

Once the extension is loaded, all you have to do is click on the little icon.  
> Note: You must also have a Karmalicity account to use this extension!

## Errors
If you encounter any errors or the extension is not working, utilise the console.  You can open the console via Chromes hotbar menu, or by pressing `CTRL + SHIFT + I`.  Information needed should be printed there; such as *"The developer needs to add more types"*.  Keep note of which credit Karmalicity was requesting, and add it to the getTargetId() function.

## To-Do
- Add a pause timer for when there are no listings available, say 10 seconds
- Add the ability so disable the extension once the daily limit is reached
- Animate the browser icon during running process
