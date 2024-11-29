<template>
    <div>
      <router-view v-slot="{ Component, route }">
        <!-- <transition name="fade-transform" mode="out-in"> 设置过渡动画 -->
          <keep-alive>
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        <!-- </transition> -->
      </router-view>
    </div>
  </template>