#!/bin/sh
set -eu
# Run from any directory after extracting the update at the portfolio repository root.
root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
if [ -f "$root/assets/images/frc-real.jpg" ]; then
  rm -- "$root/assets/images/frc-real.jpg"
  printf '%s\n' 'Removed: assets/images/frc-real.jpg'
fi
if [ -f "$root/assets/media/photos/34-community-eureka-hacks-award-winning-team-with-certific.webp" ]; then
  rm -- "$root/assets/media/photos/34-community-eureka-hacks-award-winning-team-with-certific.webp"
  printf '%s\n' 'Removed: assets/media/photos/34-community-eureka-hacks-award-winning-team-with-certific.webp'
fi
if [ -f "$root/assets/media/photos/35-community-hackathon-group-photograph-in-classroom.webp" ]; then
  rm -- "$root/assets/media/photos/35-community-hackathon-group-photograph-in-classroom.webp"
  printf '%s\n' 'Removed: assets/media/photos/35-community-hackathon-group-photograph-in-classroom.webp'
fi
if [ -f "$root/assets/media/photos/37-community-eureka-hacks-team-with-best-use-of-ai-recogni.webp" ]; then
  rm -- "$root/assets/media/photos/37-community-eureka-hacks-team-with-best-use-of-ai-recogni.webp"
  printf '%s\n' 'Removed: assets/media/photos/37-community-eureka-hacks-team-with-best-use-of-ai-recogni.webp'
fi
if [ -f "$root/assets/media/posters/video-04-pet-filament.webp" ]; then
  rm -- "$root/assets/media/posters/video-04-pet-filament.webp"
  printf '%s\n' 'Removed: assets/media/posters/video-04-pet-filament.webp'
fi
if [ -f "$root/assets/media/posters/video-05-trigr.webp" ]; then
  rm -- "$root/assets/media/posters/video-05-trigr.webp"
  printf '%s\n' 'Removed: assets/media/posters/video-05-trigr.webp'
fi
if [ -f "$root/assets/media/videos/video-04-pet-filament.mp4" ]; then
  rm -- "$root/assets/media/videos/video-04-pet-filament.mp4"
  printf '%s\n' 'Removed: assets/media/videos/video-04-pet-filament.mp4'
fi
if [ -f "$root/assets/media/videos/video-05-trigr.mp4" ]; then
  rm -- "$root/assets/media/videos/video-05-trigr.mp4"
  printf '%s\n' 'Removed: assets/media/videos/video-05-trigr.mp4'
fi
if [ -f "$root/assets/media/videos/video-07-misc.mp4" ]; then
  rm -- "$root/assets/media/videos/video-07-misc.mp4"
  printf '%s\n' 'Removed: assets/media/videos/video-07-misc.mp4'
fi
printf "%s\n" "Retired asset cleanup complete. All other media remain untouched."
