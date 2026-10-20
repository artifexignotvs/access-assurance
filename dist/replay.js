"use strict";

/* Acta observata, non status praesens. */
const steps = [
  {
    title: "A disabled account.\nAn accepted token.",
    description: "The identity provider disables the test account. The protected application still accepts the previously issued, unexpired token. The administrative action has not closed this access path.",
    state: "ACCESS REMAINS",
    target: "Access accepted",
    control: "Not shown in this step",
    conclusion: "Access remains",
    principle: "An administrative success response is not evidence that an existing application session or token has stopped working."
  },
  {
    title: "Close the path.\nCheck the application.",
    description: "An explicit resource-side deny is applied. The target request is denied while a positive control still succeeds. This supports a bounded observation of closure for the declared subject, resource, and policy.",
    state: "VERIFIED",
    target: "Access denied",
    control: "Access accepted",
    conclusion: "Bounded closure observed",
    principle: "The positive control matters: denial alone could be an outage. This historical observation has a freshness limit; it is not a universal or permanent guarantee."
  },
  {
    title: "A permission returns.\nSo does the access.",
    description: "The laboratory fault restores permission at the application. A new observation detects the previously closed path accepting the target request again. The prior receipt remains history, not current assurance.",
    state: "RESIDUAL",
    target: "Access accepted",
    control: "Access accepted",
    conclusion: "Access has returned",
    principle: "A successful observation is not a permanent property. Later evidence must be allowed to contradict an earlier conclusion."
  },
  {
    title: "An unavailable service.\nAn unknown outcome.",
    description: "The controlled application becomes unavailable. The target and the positive control cannot establish the intended access behavior. An outage is recorded as uncertainty, never as verified closure.",
    state: "UNKNOWN",
    target: "Unavailable",
    control: "Unavailable",
    conclusion: "Insufficient observation",
    principle: "Failing to reach a resource is different from proving that its access policy rejects a request. Unknown must remain an explicit result."
  },
  {
    title: "Recover the application.\nObserve afresh.",
    description: "After recovery and the intended resource-side deny, a new observation sees the target denied and the positive control accepted. A fresh VERIFIED result is recorded within the same declared test boundary.",
    state: "VERIFIED",
    target: "Access denied",
    control: "Access accepted",
    conclusion: "Fresh bounded closure",
    principle: "Fresh observation restores the bounded claim. The dated replay on this page cannot establish the current state of a live system."
  }
];

const stepButtons = Array.from(document.querySelectorAll("[data-step]"));
const previousButton = document.getElementById("previous-step");
const nextButton = document.getElementById("next-step");
let currentStep = 0;

function showStep(index) {
  currentStep = Math.max(0, Math.min(steps.length - 1, index));
  const step = steps[currentStep];
  const number = String(currentStep + 1).padStart(2, "0");
  stepButtons.forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === currentStep)));
  document.getElementById("replay-step").textContent = `RECORDED STEP ${number} / 05`;
  const heading = document.getElementById("replay-heading");
  heading.replaceChildren();
  step.title.split("\n").forEach((line, lineIndex) => {
    if (lineIndex) heading.append(document.createElement("br"));
    heading.append(document.createTextNode(line));
  });
  document.getElementById("replay-description").textContent = step.description;
  const result = document.getElementById("replay-result");
  result.textContent = step.state;
  result.dataset.state = step.state;
  document.getElementById("replay-target").textContent = step.target;
  document.getElementById("replay-control").textContent = step.control;
  document.getElementById("replay-conclusion").textContent = step.conclusion;
  document.getElementById("replay-principle").textContent = step.principle;
  document.getElementById("replay-position").textContent = `${number} — 05`;
  previousButton.disabled = currentStep === 0;
  nextButton.disabled = currentStep === steps.length - 1;
}

stepButtons.forEach((button, index) => {
  button.addEventListener("click", () => showStep(index));
  button.addEventListener("keydown", (event) => {
    let destination;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") destination = Math.min(index + 1, steps.length - 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") destination = Math.max(index - 1, 0);
    if (event.key === "Home") destination = 0;
    if (event.key === "End") destination = steps.length - 1;
    if (destination === undefined) return;
    event.preventDefault();
    showStep(destination);
    stepButtons[destination].focus();
  });
});
previousButton.addEventListener("click", () => showStep(currentStep - 1));
nextButton.addEventListener("click", () => showStep(currentStep + 1));
showStep(0);
