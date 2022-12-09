<template>
    <v-card class="overflow-hidden">
    <div class="header">
      <v-app-bar
        absolute
        color="teal lighten-3"
        dark
        hide-on-scroll
        prominent
        scroll-target="#scrolling-techniques-4"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        
        <v-spacer></v-spacer>
        <v-toolbar-title align="center">A Hotel</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-4"
      >
        <v-container style="height: 1000px;"></v-container>
      </v-sheet>
    </div>
    </v-card>
  </template>

<style>
.fontheader{
   text-align: centers;
}

</style>