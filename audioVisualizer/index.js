document.getElementById("audio").addEventListener("change", (event) => {
  /* here will get the file data */
  const file = event.target.files[0];
  /*2. Process the data */
  /* we need to convert to ArrayBuffer for that we use FileReader */
  /* ArrayBuffer is useful for handling raw or binary data */
  /* mp3 file converted into raw binary data that will be stored inside this ArrayBuffer  */
  /* this creates instance of FileReader */
  const reader = new FileReader();
  /* now this readAsArrayBuffer method reads this audio file and create new ArrayBuffer from it */
  /* this readAsArrayBuffer() asyncronous method it doesnot return anything directly from this*/
  /* in order to get the actual value we make use of eventlistner */
  /* this load event will be triggred as soon as this file read as ArrayBuffer then callback function is called*/
  /* now we need to convert arraybuffer into audiobuffer with the help of AudioContext provided by webaudioapi */
  reader.addEventListener("load", (event) => {
    /* taking arraybuffer value from event */
    const arrayBuffer = event.target.result;
    /* suppose AudioContext is there then create instance with Audio Context else it create instance with webkitAudioContext */
    /* if some legacy browser does not suppor AudioContext the it default to webkitAudioContext */
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    /* we can use this audiocontext to convert ArrayBuffer to AudioBuffer */
    /* it takes arrayBuffer and callback function as input and once arraybuffer converted to audiobuffer the this callback function will be executed */
    audioContext.decodeAudioData(arrayBuffer, (audiobuffer) => {
      visualize(audiobuffer, audioContext);
    });
  });

  reader.readAsArrayBuffer(file);
});

/* 3. visualize the data */
/* this function responsible for visualizing the audio buffer and drawing canvas from it */
function visualize(audioBuffer, audioContext) {
  const canvas = document.getElementById("canvas");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  //   console.log(analyser.frequencyBinCount);
  /* we are going to store the freequency data inside of this array  frequencyData */
  /* and we are going to use uint8array a typed array in this case and length of array is analyser.frequencyBinCount*/
  const freequencyBufferLength = analyser.frequencyBinCount;
  const frequencyData = new Uint8Array(freequencyBufferLength);
  /* connect source and analyser to get realtime data  */
  /* create the source */
  const source = audioContext.createBufferSource();
  /* connect audioBuffer with source buffer  because this audiobuffer contain audio file data that was uploaded by the user */
  source.buffer = audioBuffer;
  /* connect with anlyzer */
  source.connect(analyser);
  /* we need to connect anlyzer with audiocontext to play the audio */
  analyser.connect(audioContext.destination);
  /* start playing video */
  source.start();
  /* inorder to draw something on to the convas we need context */
  /* since our chat have 2dimentional we provide 2d */
  /* getContext method return convasContext which will be useful for drawing something on the canvas */
  const canvasContext = canvas.getContext("2d");
  /* we need actual data which will be plating as bar graph */
  /* now we have 2 streams of the data since we have 2 channels the left and right channel we can either plot 2bar graphs here for the left and right channel or just we can plot one graph*/
  /* inorder to get channelData you can use getChannelData method and getChannelData(0) return first channel data */
  /* it will give float32Array Data its PCM data which is the amplitudes of the signals */
  //   const channelData = audioBuffer.getChannelData(0);
  /* using amplitudes data to plot a bar graph */
  /* audiobuffer has 5million data points so ploting this data points into bar graph is tricky thing  */
  /* instead of ploting each and evry point from audiobuffer file divide the array into chunks like 3datapoints in one chunck etc so length of datapoints reduces*/
  /* iam setting here 100 it will look good and decent will see first then adujust accordingly */
  //   const numberOfChunks = 400;
  /* lets round this number using ceil */
  //   const chunkSize = Math.ceil(channelData.length / numberOfChunks);
  /* to draw something we make use canvasContext */
  /* we are going to use rectangles which represent diffrent bars in the graph */
  /* to fill the the color */
  //   canvasContext.fillStyle = "#5271FF";
  /* since we are going to write above and below baseline bar graph  to determine that baseline we have to find center of the canvas*/
  //   const center = canvas.height / 2;
  /* width of the bar */
  const barWidth = canvas.width / freequencyBufferLength;
  function draw() {
    requestAnimationFrame(draw);
    canvasContext.fillStyle = "#facfde";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    // canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    /* this method going update array with realtime frequency data*/
    analyser.getByteFrequencyData(frequencyData);
    for (let i = 0; i <= freequencyBufferLength; i++) {
      canvasContext.fillStyle = `rgba(82, 113, 255, ${frequencyData[i] / 255})`;
      // const chunck = channelData.slice(i * chunkSize, (i + 1) * chunkSize);
      // const min = Math.min(...chunck) * 20;
      // const max = Math.max(...chunck) * 20;
      // console.log(min, max);
      /* to draw the rectangle  we use fillRect method and accepts 4 arguments x and y coordinates it represents topleft corner of the rectange and width and height*/
      canvasContext.fillRect(
        i * barWidth,
        canvas.height - frequencyData[i],
        barWidth - 1,
        frequencyData[i]
      );
    }
  }
  draw();
  /* https://github.com/thecodedose/audio-visualiser-js */
}
