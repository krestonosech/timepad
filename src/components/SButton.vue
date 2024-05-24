<template>
  <v-btn
    v-bind="$attrs"
    v-on="$attrs"
    class="s-button"
    :class="{
      [`s-button--type-${type}`]: type,
      's-button--inline': inline,
      [`s-button--size-${size}`]: size,
    }"
    variant="text"
    :loading="loading"
    :type="type"
  >
    <v-icon
      v-if="prependIcon"
      class="s-button__icon mr-2"
      :class="{
        's-button__icon--rotate': rotate,
      }"
      >{{ prependIcon }}</v-icon
    >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { BtnTypes } from '@/types/IBtn'

  interface Props {
    type?: BtnTypes | 'submit';
    inline?: boolean;
    prependIcon?: string;
    size?: 'auto' | 'normal' | 'small' | '';
    rotate?: boolean;
    loading?: boolean;
  }

// eslint-disable-next-line no-undef
withDefaults(defineProps<Props>(), {
  type: 'normal',
  inline: false,
  prependIcon: '',
  size: '',
  rotate: false,
  loading: false
})
</script>

<style lang="scss">
  .s-button {
    height: 43px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: 1px solid #92278f;

    &.v-btn {
      &:not(.v-btn-round) {
        &.v-btn--size-default {
          padding: 15px 40px;
        }
      }

      &--disabled {
        background: #d0d0d0;
        border: none;
        color: #f5f5f5;
      }
    }

    &--inline {
      display: inline-flex;
    }

    &--type {
      &-normal {
        background-color: #fdfdfd;

        .v-btn__content {
          color: #92278f!important;
        }

        .v-progress-circular {
          color: #92278f!important;
        }
      }

      &-primary {
        background: linear-gradient(290.48deg, #92278f 0%, #c6168d 58.33%, #ed1c24 100%);;

        .v-btn__content {
          color: #ffffff!important;
        }

        .v-progress-circular {
          color: #ffffff!important;
        }
      }
    }

    &--size {
      &-auto {
        max-width: fit-content;
      }

      &-normal {
        max-width: 241px;
      }

      &-small {
        max-width: 124px;
        height: 33px !important;
      }
    }

    &.v-btn--icon {
      background-color: unset;
      border-color: unset;
      border: none;
    }

    &__icon {
      position: relative;
      bottom: 1px;

      &--rotate {
        svg {
          animation: spin 1s linear infinite;
        }
      }
    }

    .v-btn__content {
      font-size: 13px;
      line-height: 1;
      text-transform: none;
    }
  }

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
