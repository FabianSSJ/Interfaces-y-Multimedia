AFRAME.registerComponent("gaze-timer", {
  schema: {
    duration: { type: "int", default: 10000 },
  },
  init: function () {
    this.timer = null;
    this.isIntersected = false;
    
    // Create a visual indicator (progress ring/text)
    this.statusText = document.createElement('a-entity');
    this.statusText.setAttribute('text', 'value: ANALIZANDO AREA...; align: center; width: 4; color: #66ff66');
    this.statusText.setAttribute('position', '0 2.5 0');
    this.statusText.setAttribute('visible', 'false');
    this.el.appendChild(this.statusText);

    const startGaze = () => {
      if (this.isIntersected) return;
      this.isIntersected = true;
      this.statusText.setAttribute('visible', 'true');
      this.el.setAttribute('material', 'opacity: 0.8; color: #66ff66');
      
      this.timer = setTimeout(() => {
        if (this.isIntersected) {
          this.triggerReaction();
        }
      }, this.data.duration);
    };

    const endGaze = () => {
      this.isIntersected = false;
      this.statusText.setAttribute('visible', 'false');
      this.el.setAttribute('material', 'opacity: 0.5; color: #4a4a4a');
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    };

    // Listen to self and proxy children
    this.el.addEventListener("mouseenter", startGaze);
    this.el.addEventListener("mouseleave", endGaze);
    this.el.addEventListener("gaze-proxy-start", startGaze);
    this.el.addEventListener("gaze-proxy-end", endGaze);
  },

  triggerReaction: function () {
    console.log(
      "Narrative trigger activated after " +
        this.data.duration / 1000 +
        " seconds.",
    );

    // 1. Change lighting (Focalization)
    const globalLight = document.querySelector(
      '[light-controller="role: global"]',
    );
    const focusLight = document.querySelector(
      '[light-controller="role: focus"]',
    );

    if (globalLight && focusLight) {
      globalLight.setAttribute(
        "animation",
        "property: light.intensity; to: 0.1; dur: 2000; easing: easeInOutSine",
      );
      focusLight.setAttribute(
        "animation",
        "property: light.intensity; to: 1.5; dur: 2000; easing: easeInOutSine",
      );
    }

    // 2. Show contextual information
    const infoPanel = document.querySelector("#info-panel");
    if (infoPanel) {
      infoPanel.setAttribute("visible", "true");
      infoPanel.setAttribute('text', 'value: ANALISIS COMPLETADO. Impacto detectado.');
      infoPanel.setAttribute(
        "animation",
        "property: scale; from: 0 0 0; to: 1 1 1; dur: 1000; easing: easeOutElastic",
      );
    }
    this.statusText.setAttribute('visible', 'false');
    this.statusText.setAttribute('text', 'value: ANALISIS COMPLETADO; color: #ffff00');
    this.statusText.setAttribute('visible', 'true');
  },
});

// Proxy component to bubble up gaze events to parent
AFRAME.registerComponent('gaze-proxy', {
    init: function () {
        this.el.addEventListener('mouseenter', () => {
            this.el.closest('#impact-zone').emit('gaze-proxy-start');
        });
        this.el.addEventListener('mouseleave', () => {
            this.el.closest('#impact-zone').emit('gaze-proxy-end');
        });
    }
});

// New component for immediate visual feedback on any interactable
AFRAME.registerComponent('hover-glow', {
    init: function () {
        this.el.addEventListener('mouseenter', () => {
            this.el.setAttribute('animation__hover', 'property: scale; to: 1.2 1.2 1.2; dur: 200');
            if (this.el.components.material) {
                this.originalColor = this.el.getAttribute('material').color;
                this.el.setAttribute('material', 'emissive: #333; emissiveIntensity: 0.5');
            }
        });
        this.el.addEventListener('mouseleave', () => {
            this.el.setAttribute('animation__hover', 'property: scale; to: 1 1 1; dur: 200');
            if (this.el.components.material) {
                this.el.setAttribute('material', 'emissive: #000; emissiveIntensity: 0');
            }
        });
    }
});

AFRAME.registerComponent("light-controller", {
  schema: {
    role: { type: "string", default: "global" },
  },
});

AFRAME.registerComponent("accessibility-manager", {
  init: function () {
    this.highContrast = false;
    this.subtitlesEnabled = false;

    this.el.addEventListener("toggle-contrast", () => {
      this.highContrast = !this.highContrast;
      this.updateContrast();
    });

    this.el.addEventListener("toggle-subtitles", () => {
      this.subtitlesEnabled = !this.subtitlesEnabled;
      this.updateSubtitles();
    });
  },

  updateContrast: function () {
    const panels = document.querySelectorAll(
      "a-entity[geometry], a-entity[text]",
    );
    const btn = document.querySelector("#btn-contrast");

    if (this.highContrast) {
      btn.setAttribute("text", "value: ALTO CONTRASTE: ON");
      btn.setAttribute("material", "color: #FFFF00");
      btn.setAttribute("text", "color: #000000");

      // Apply high contrast to info panel
      const infoPanel = document.querySelector("#info-panel");
      if (infoPanel) {
        infoPanel.setAttribute("material", "color: white");
        infoPanel.setAttribute("text", "color: black");
      }
    } else {
      btn.setAttribute("text", "value: ALTO CONTRASTE: OFF");
      btn.setAttribute("material", "color: #222");
      btn.setAttribute("text", "color: #FFF");

      const infoPanel = document.querySelector("#info-panel");
      if (infoPanel) {
        infoPanel.setAttribute("material", "color: #000");
        infoPanel.setAttribute("text", "color: white");
      }
    }
  },

  updateSubtitles: function () {
    const sub = document.querySelector("#spatial-subtitle");
    const btn = document.querySelector("#btn-subtitles");

    if (this.subtitlesEnabled) {
      btn.setAttribute("text", "value: SUBTITULOS: ON");
      sub.setAttribute("visible", "true");
    } else {
      btn.setAttribute("text", "value: SUBTITULOS: OFF");
      sub.setAttribute("visible", "false");
    }
  },
});

AFRAME.registerComponent("accessibility-btn", {
  schema: {
    type: { type: "string" },
  },
  init: function () {
    this.el.addEventListener("click", () => {
      if (this.data.type === "contrast") {
        this.el.sceneEl.emit("toggle-contrast");
      } else if (this.data.type === "subtitles") {
        this.el.sceneEl.emit("toggle-subtitles");
      }
    });

    // Visual feedback for focus (WCAG 2.4.7)
    this.el.addEventListener("mouseenter", () => {
      this.el.setAttribute("scale", "1.1 1.1 1.1");
    });
    this.el.addEventListener("mouseleave", () => {
      this.el.setAttribute("scale", "1 1 1");
    });
  },
});
