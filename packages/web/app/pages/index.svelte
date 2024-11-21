<script>
  import { onMount } from 'svelte';
  import pbToTypescript from 'pbts/core';
  import ClipboardJS from 'clipboard';
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";

  let src = `
syntax = "proto3";

service MyService {
    // This is a comment.
    rpc MyMethod (MyRequest) returns (MyResponse);
}

message MyRequest {
    // path is a required field.
    string path = 1;
}

message MyResponse {
    int32 status = 1;
}
  `;

  let dest = '';

  let selectedDefinition = localStorage.getItem('selectedDefinition') || 'typescript';
  let selectedMode = localStorage.getItem('selectedMode') || 'strict';

  let isWarning = false;

  function onProtobuf() {
    dest = pbToTypescript.parseProto('syntax = "proto3";' + src, {
      outputType: selectedDefinition,
      mode: selectedMode,
    });
    localStorage.setItem('selectedDefinition', selectedDefinition);
    localStorage.setItem('selectedMode', selectedMode);
    isWarning = false;
  }

  onMount(() => {
    window.onerror = () => {
      isWarning = true;
    };
    onProtobuf();
    new ClipboardJS('.button');
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
    <div class="tool-bar">
      <span class="label">Output Type</span>
      <select
        bind:value={selectedDefinition}
        on:change={onProtobuf}
        on:blur={onProtobuf}
        class="type-selector"
      >
        <option value="typescript">Typescript File</option>
        <option value="definition">Typescript d.ts</option>
        <option value="jsdoc">Jsdoc</option>
      </select>
      <span class="label">Mode</span>
      <select
        bind:value={selectedMode}
        on:change={onProtobuf}
        on:blur={onProtobuf}
        class="type-selector"
      >
        <option value="normal">Normal</option>
        <option value="strict">Strict</option>
      </select>
    </div>
    <CodeMirror bind:value={dest} lang={javascript()} readonly/>
    <span class="rightcorner button" data-clipboard-text={dest}>Copy to clipboard</span>
  </div>
</div>

<style>
</style>
