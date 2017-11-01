<?php

// Creating a variable for setting a background image in a node template file.

/**
 * Implements template_preprocess_node().
 */
function MODULE_preprocess_node(&$variables) {
  if ($variables['type'] == 'opportunity' && $variables['view_mode'] == 'homepage_opportunity_feature') {
    $variables['homepage_opportunity_feature_bg_image'] = '';
    if (!empty($variables['field_landscape_image'][0]['sid'])) {
      $sid = $variables['field_landscape_image'][0]['sid'];
      $atom = scald_atom_load($sid);
      $style_url = image_style_url($variables['content']['field_landscape_image']['#formatter'], $atom->base_entity->uri);
      $variables['homepage_opportunity_feature_bg_image'] = $style_url;
    }
  }
}

// Creating a variable for adding a class to the HTML tag.

/**
 * Implements theme_preprocess_html().
 */
function MODULE_preprocess_html(&$variables) {
  $variables['html_tag_class'] = '';

  $node = menu_get_object();

  if (!empty($node) && $node->type == 'donation_form') {
    $variables['html_tag_class'] = 'donation-form-html';
  }
}


/**
 * Implements template_preprocess_field().
 */
function MODULE_preprocess_field(&$variables, $hook) {
  // If no state chosen remove the comma after city.
  if (empty($variables['element']['#items'][0]['administrative_area'])) {
    if (isset($variables['items'][0]['locality_block']['locality']['#suffix'])) {
      unset($variables['items'][0]['locality_block']['locality']['#suffix']);
    }
  }
}

// Registering template files for a couple forms.

/**
 * Implements hook_theme().
 */
function MODULE_public_theme() {
  return array(
    'contact_site_form' => array(
      'render element' => 'form',
      'template' => 'contact-site-form',
      'path' => drupal_get_path('module', 'module_name') . '/theme',
    ),
    'webform_form_2091' => array(
      'render element' => 'form',
      'template' => 'webform-form-2091',
      'path' => drupal_get_path('module', 'module_name') . '/theme',
    ),
  );
}

// A basic form alter.

/**
 * Implements hook_form_ID_alter().
 */
function MODULE_form_contact_site_form_alter(&$form, &$form_state) {
  $form['message']['#title'] = t('Tell us more:');
  $form['subject']['#title'] = t('Subject Line');
  $form['actions']['submit']['#value'] = t('Send Us Your Message');
  $form['mail']['#title'] = t('Your email address');

  $form['name']['#attributes']['autocorrect'] = 'off';
  $form['mail']['#type'] = 'emailfield';
  $form['mail']['#attributes']['autocorrect'] = 'off';
  $form['mail']['#attributes']['autocapitalize'] = 'off';
}


