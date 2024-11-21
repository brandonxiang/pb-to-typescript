<script>
  import { onMount } from 'svelte';
  import protobufjs from 'protobufjs';
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";

  let src = `
syntax = "proto3";

service MyService {
  rpc MyMethod (MyRequest) returns (MyResponse);
}

message MyRequest {
  string path = 1;
}

message MyResponse {
  int32 status = 1;
}
  `;

  let dest = '';

  let isWarning = false;

  function onProtobuf() {
    const res = protobufjs.parse(src, {
      alternateCommentMode: false,
      preferTrailingComment: false,
      keepCase: true,
    });
    dest = JSON.stringify(res.root, null, 2);
    isWarning = false;
  }

  onMount(() => {
    window.onerror = () => {
      isWarning = true;
    };
    onProtobuf();
  });

  window.addEventListener('message', event => {
    const message = event.data;
    if (message.command === 'paste') {
      src += message.text;
    }
  });
</script>

<div id="container">
  <div class="col">
    <h3>Protocol buffer</h3>
    <CodeMirror bind:value={src} lang={javascript()} on:change={onProtobuf}/>
    {#if isWarning}
      <span class="rightcorner warning">Invalid Protobuf</span>
    {/if}
  </div>
  <div class="col">
    <div class="tool-bar" style="height: 40px"></div>
    <CodeMirror bind:value={dest} lang={javascript()} readonly/>
  </div>
</div>
