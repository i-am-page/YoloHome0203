<script setup>
const props = defineProps(["label", "type", "placeholder", "modelValue", "readOnly"]);
defineEmits(["update:modelValue"]);
</script>

<template>
    <div>
        <label class="block text-sm font-medium text-slate-700 mb-2 text-gray-900">{{
            props.label
        }}</label>
        <div>
            <input :type="props.type" :placeholder="props.placeholder" :value="props.modelValue" :readonly="props.readOnly"
                @input="$emit('update:modelValue', $event.target.value)"
                class="font-mono border block w-full p-2 text-sm rounded-lg focus:ring-blue-500 focus:border-e-500" />
        </div>
    </div>
</template>
