//region Preamble
/**
 * SPDX-License-Identifier: MIT
 * Copyright © 2021 Gabriel Rodrigues
 */
//endregion

export const TRANSLATIONS_EN = {
  // Loading
  loading: "Loading...",
  loading_header: "Loading...",

  // Prompt
  prompt_ok: "Done",
  prompt_close: "Close",

  // Home
  home_header: "Home",

  // home_add_new_train_before: 'Adicione um novo treino no botão "',
  home_add_new_train_before: 'Click on the button "',
  home_add_new_train_after: '" to add a new train.',

  // Search
  search_header: "Search",
  search_text_input: "Search...",
  search_trains: "Trains",
  search_steps: "Steps",
  search_trains_and_steps: "Trains & Steps",
  search_enter_a_search_term: "Type a search term.",
  search_no_results_found: "No results found.",

  // New Train
  new_train_header: "New Train",

  // CRUD Train
  crud_train_content_general_name: "Train Name",
  crud_train_content_steps_label: "Steps",
  crud_train_content_steps_add_step: "Add next step",
  crud_train_content_step_edit_step_description: "Description",
  crud_train_content_step_edit_step_mode: "Mode",
  crud_train_content_step_edit_step_mode_prescription: "Prescription",
  crud_train_content_step_edit_step_mode_reference: {
    unknown: "Reference: Unknown",
    train: "Reference: Train",
  },
  crud_train_content_step_edit_step_mode_custom: "Custom Duration",

  // Start Train
  start_train_header: "Train",
  start_train_train_done: "Done.",
  start_train_left_train: "Left Train",
  start_train_left_train_message: "Are you sure you wanna left the train?",
  start_train_left_train_option_cancel: "No",
  start_train_left_train_option_confirm: "Yes",
  start_train_call_to_action: "Start Train",

  // Start Train Runner

  start_train_runner_paused_header: "Pause",
  start_train_runner_paused_description: "Paused",
  start_train_runner_state_ready_to_go: "Ready to go.",
  start_train_runner_state_starts_with: 'Starts with: "{{description}}".',
  start_train_runner_state_interval: "Interval.",
  start_train_runner_state_next_step: 'Next step: "{{description}}".',
  start_train_runner_nth_step_of_total: "Step {{step}} of {{total}}.",
  start_train_runner_nth_step_slash_total: "{{step}} / {{total}}",

  // View Train
  view_train_action_cancel: "Cancel",
  view_train_action_delete_train: "Delete Train",
  view_train_duration_total: "Total",

  // Settings
  settings: "Settings",
  settings_header: "Settings",

  settings_duration: "Duration",
  settings_duration_train: "Train",
  settings_duration_interval: "Interval",
  settings_duration_countdown: "Countdown",

  settings_general: "General Settings",
  settings_general_language: "Language",
  settings_general_language_auto: "System Languge",
  settings_general_language_undo: "Undo",
  settings_general_language_done: "Done",
  settings_general_language_changed_successfully:
    "Language changed successfully.",

  settings_apparence: "Apparence",
  settings_apparence_theme: "Theme",
  settings_apparence_theme_auto: "Automatic (System Theme)",
  settings_apparence_theme_light: "Light",
  settings_apparence_theme_dark: "Dark",

  settings_about: "About",
  settings_about_author: "Author",
  settings_about_sourceCode: "Source code",
  settings_about_license: "License",
};
