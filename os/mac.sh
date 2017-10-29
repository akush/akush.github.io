#!/bin/sh 

mkdir ~/Pictures/Screenshot
defaults write com.apple.screencapture location ~/Pictures/Screenshot
killall SystemUIServer