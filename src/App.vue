<template>
  <Periodum/>
</template>

<script>
import Periodum from './components/Periodum.vue'

export default {
  name: 'App',
  components: { Periodum },
  data() {
    return {
      search_icon: 'require("../resources/img/misc/search.svg")'
    }
  }
}
</script>

<style lang="scss">
  * {
    margin:0;
    padding: 0;
    box-sizing: border-box;
    // outline: 1px solid #f00 !important;
  }

  .active_modal {
    overflow: hidden;
  }

  body {
    display:flex;
    // place-items: center;
    
    justify-content: center;
    background-color: #1A1F2A;
    color: #f6f9fa;
    
    a {
      color: #e5bb09;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }

    label {
      color: white;
    }

    span {
      margin-bottom: .2vw;
    }
    
    // overscroll-behavior-y: contain;
    // overflow-y: auto;
    
    // overscroll-behavior-y: hidden;
    // overflow-y: hidden;
  }


  @font-face{
    font-family: 'Nunito Sans';
    src: url('./resources/fonts/NunitoSans-Regular.ttf');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face{
    font-family: 'Emoji';
    src: url('./resources/fonts/NotoEmoji.ttf');
    font-weight: normal;
    font-style: normal;
  }
  #app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    font-family: 'Nunito Sans', sans-serif;
    font-weight: lighter;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    // margin-top: 60px;
  }
  
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
  }

	.divider {
		border-top: 1px solid rgb(0, 0, 0);
		opacity: .1;
		margin: .3rem 0;
	}

  input[type="search"], input[type="text"], input[type="number"] {
    background-color: transparent;
    // width: 27vw;
    font-size: .8vw;
    font-family: 'Nunito Sans', sans-serif;
    border-radius: .3rem;
    border: 1px solid #343f54;
    padding: .2rem;
    padding-left: .4rem;
    padding-right: .2rem;
    color: white;
  }

  input[type="search"]:focus, input[type="text"]:focus, input[type="number"]:focus {
    border-radius: .3rem;
    border: 1px solid #e5bb09;
  }

  input[type="checkbox"] {
    width: 1vw;
    height: 1vw;
  }
  
  // input[type=range] {
  //   appearance: none;
  //   height: 1.35vmin;
  //   width: 100%;
  //   height: 2vw;
  //   background: #343f54;
  //   border-radius: .5vw;
  //   padding: .5vw;
  //   outline: none;
  // }

  input[type="range"] {
		outline: 0;
		border: 0;
		border-radius: .3rem;
		border-radius: 300px;
		// width: 400px;
		max-width: 100%;
		transition: box-shadow 0.2s ease-in-out;
		// Chrome
    & {
      overflow: hidden;
      height: 2vw;
      -webkit-appearance: none;
      background-color: #1A1F2A;
    }
    &::-webkit-slider-runnable-track {
      height: 2vw;
      -webkit-appearance: none;
      color: #1A1F2A;
      // margin-top: -1px;
      transition: box-shadow 0.2s ease-in-out;
    }
    &::-webkit-slider-thumb {
      width: 1px;
      -webkit-appearance: none;
      margin-top: -5vw;
      height: 10vw;
      cursor: ew-resize;
      background: #000;
      box-shadow: -60vw 0 0 60vw #e5bb09, inset 0 0 0 0 #e5bb09;
        transition: box-shadow 0.2s ease-in-out;
      position: relative;
      // top: 1px;
    }
    &:active::-webkit-slider-thumb {
      // background: #fff;
      box-shadow: -60vw 0 0 60vw #e5bb09, inset 0 0 0 3px #e5bb09;
    }
		// Firefox
		&::-moz-range-progress {
			background-color: #43e5f7; 
		}
		&::-moz-range-track {  
			background-color: #9a905d;
		}
		// IE
		&::-ms-fill-lower {
			background-color: #43e5f7; 
		}
		&::-ms-fill-upper {  
			background-color: #9a905d;
		}
	}

  ::placeholder {
    font-family: 'Nunito Sans', sans-serif;
  }

  .btn {
    border: 1px solid #343f54;
    background-color: #232a38;

    color: #e5bb09;
    font-weight: bold;
    font-size: .7vw;
    
    box-shadow: 0 0 0 .1rem #343f54;
    // background-image: linear-gradient(135deg, #343f54, #232a38);
    
    &:hover {
      cursor: pointer;
      // box-shadow: 0 0 .2vw black;
    }
    &:focus {
      cursor: pointer;
      border: 1px solid #e5bb09;
    }
  }
  

  // input[type='range']::-webkit-slider-thumb {
  //   width: .8vw;
  //   height: .8vw;
  //   border-radius: 100%;
  //   // -webkit-appearance: none;
  //   background: #e5bb09;
  // }

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: none;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider:before {
  position: absolute;
  content: "";
  font-size: 1vmin;
  height: 1.5vw;
  width: 1.5vw;
  left: .2vw;
  bottom: .14vw;
  background-color: #2c2c2c;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  
}

input:checked + .slider {
  background: #343f54;
}

input:checked + .slider:before {
  background-color: #f3c93c; 
  content: "";
  // content: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 24.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' style='enable-background:new 0 0 20 20;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFCE03;%7D%0A%3C/style%3E%3Ctitle%3Elogo%3C/title%3E%3Cg%3E%3Cpath class='st0' d='M270.9,56.7c-133,0-240.8,107.8-240.8,240.8c0,73.6,33.1,139.3,85.1,183.5V292.5h52.9 c1.5,16.7,5.7,32.1,12.7,45.8c9.1,17.7,22.4,31.5,39.1,40.8c16.1,10.1,34.9,15.2,55.8,15.2c20.5,0,39-5,55.3-14.7 c16.3-9.7,29.3-23.5,38.8-41c7.5-13.7,11.9-29.2,13.5-46h54.9c-1.7,24.9-7.8,48.2-18.9,69.3c-12.9,24.6-31.4,44.4-54.7,58.8 c-23.7,14.4-50.5,21.7-79.4,21.7c-19.1,0-37.4-3.4-54.2-10.2c-16.9-6.7-32.1-16.6-45.2-29.2l-17-16.5v128.9 c31,14.6,65.6,23,102.2,23c133,0,240.8-107.8,240.8-240.8C511.7,164.5,403.9,56.7,270.9,56.7z M284,210.3 c13.9,0,25.3,11.3,25.3,25.2c0,13.9-11.3,25.3-25.3,25.3c-13.9,0-25.3-11.3-25.3-25.3C258.7,221.6,270,210.3,284,210.3z M238.4,152.2c11.2,0,20.3,9.1,20.3,20.3c0,11.2-9.1,20.3-20.3,20.3s-20.3-9.1-20.3-20.3C218,161.3,227.1,152.2,238.4,152.2z M264.3,367.4C202.5,359.1,201,292,201,292c27.1,16.6,44.5,21.1,79.9,0c35.4-21.1,70.1,0,70.1,0 C353.2,322.1,326.1,375.7,264.3,367.4z'/%3E%3C/g%3E%3C/svg%3E%0A");
  margin:auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}


input:checked + .slider:before {
  -webkit-transform: translateX(1.6vw);
  -ms-transform: translateX(1.6vw);
  transform: translateX(1.6vw);
}

  /* Rounded sliders */
  .slider.round {
    border-radius: 1rem;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  /* width */
  ::-webkit-scrollbar {
    width: .3rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    appearance: none;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #e5bb09;
    border-radius: 1rem;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #e5bb09;
  }

  .preventMouseEvent {
    pointer-events:none;
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .fade {
    animation: fadeIn 120ms ease-in; 
  }
  .mute {
    opacity: .3;
  }
  .fit-content {
    max-width: fit-content
  }
  .scroll {
    overflow: scroll;
    text-overflow: ellipsis;
  }
  .h-100 {
    height: 100%;
  }
  .flex {
    display: flex;
  }
  .flex-column {
    flex-direction: column;
  }
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
  .flex-around {
    display: flex;
    justify-content: space-around;
  }
  .flex-start {
    display: flex;
    justify-content: flex-start;
  }
  .flex-end {
    display: flex;
    justify-content: flex-end;
  }
  .flex-center {
    display: flex;
    justify-content: center;
  }
  .align-center {
    align-items: center;
  }
  .align-start {
    align-items: flex-start;
  }
  .align-end {
    align-items: flex-end;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .text-center {
    text-align: center;
  }
  .mb--2 {
    margin-bottom: -2vw;
  }
  .pos-abs {
    position: absolute;
  }
  .active {
    display: block;
  }
  .inactive {
    display: none;
  }
  
  .text-white { color: white; }
  .text-black { color: black; }
  .text-primary { color: #e5bb09; }



/* Style The Dropdown Button */
.dropdown-button {
  background-color: rgba($color: #000, $alpha: .1);;
  color: #fff;
	padding: .1rem .5rem;
	height: 2.3rem;
	min-width: 4rem;
	border-radius: .3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
	text-align: left;

	&::before {
		// content: "⮟ ";
		content: "✛ ";
		
		color: #e5bb09;
	}
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;

	&:hover {
		.dropdown-button::before {
			color: #000;
		}
	}
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
	right: 0vw;
  position: absolute;
  background-color: rgba($color: #232a38, $alpha: .9);
  box-shadow: 0 0 1rem rgba(0,0,0,.8);
	height: 10rem;
	border-radius: .3rem;
	min-width: 4rem;

	overflow: scroll;
	
	z-index: 20;
	// animation: anim_dropdown 50ms ease;
}

/* Links inside the dropdown */
.dropdown-content a {
	color: #e5bb09;
  padding: .3rem .5rem;
  text-decoration: none;
	
	border-radius: .3rem;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #e5bb09; color: #000; border-radius: .1vw;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
	overflow-x: hidden;
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropdown-button {
  background-color: rgba($color: #e5bb09, $alpha: 1);
	color: #000;
}
</style>