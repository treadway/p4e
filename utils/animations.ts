// utils/animations.ts - Global animation configuration system
import { Easing } from "react-native";

export interface AnimationConfig {
	duration: number;
	easing: any;
	delay?: number;
}

export interface AnimationPresets {
	sineInOut: AnimationConfig;
	elasticOut: AnimationConfig;
	elasticIn: AnimationConfig;
}

// Global animation multiplier - adjust this to speed up/slow down all animations
const GLOBAL_ANIMATION_SPEED = 1.0; // 1.0 = normal, 0.5 = half speed, 2.0 = double speed

export const createAnimationPresets = (
	speedMultiplier: number = 1
): AnimationPresets => ({
	sineInOut: {
		duration: (400 * GLOBAL_ANIMATION_SPEED) / speedMultiplier,
		easing: Easing.bezier(0.37, 0, 0.63, 1), // Sine in/out approximation
	},
	elasticOut: {
		duration: (600 * GLOBAL_ANIMATION_SPEED) / speedMultiplier,
		easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), // Elastic out approximation
	},
	elasticIn: {
		duration: (500 * GLOBAL_ANIMATION_SPEED) / speedMultiplier,
		easing: Easing.bezier(0.6, -0.28, 0.735, 0.045), // Elastic in approximation
	},
});

// Default animation presets
export const animations = createAnimationPresets();

// Custom hook for component-specific animation overrides
export const useAnimations = (speedOverride?: number) => {
	return speedOverride ? createAnimationPresets(speedOverride) : animations;
};
