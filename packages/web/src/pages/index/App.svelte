<script>
  import { onMount } from 'svelte';
  import pbToTypescript from 'pbts';
  import ClipboardJS from 'clipboard';
  import Navbar from '../../components/Navbar.svelte';

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

  let selected;

  let isWarning = false;

  function onProtobuf() {
      const isDefinition = !!Number(selected);
      dest = pbToTypescript.parseProto('syntax = "proto3";' + src, { isDefinition: isDefinition});
      isWarning = false;
  }

  onMount(() => {
    window.onerror = () => {
      isWarning = true;
    }
    onProtobuf()
    new ClipboardJS('.button');
  })
</script>

<Navbar current={0}/>
<div id="container">
  <div class="col">
    <h3>Protocol buffer</h3>
<textarea name="" bind:value={src} on:input={onProtobuf}></textarea>
 {#if isWarning}
    <span class="rightcorner warning">Invald Protobuf</span>
 {/if}
  </div>
  <div class="col">
    <select bind:value={selected} on:change={onProtobuf} on:blur={onProtobuf} class="type-selector">
      <option value="1">Typescript d.ts</option>
      <option value="0">Typescript File</option>
    </select>
    <textarea name="" id="typescript" bind:value={dest}></textarea>
    <span class="rightcorner button" data-clipboard-target="#typescript">Copy to clipboard</span>
  </div>
</div>
