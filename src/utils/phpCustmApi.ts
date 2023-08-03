// <?php
// /**
//  * Plugin Name: Typhoon Media Custom API Plugin
//  * Plugin URI: https://alliancecarstg.wpengine.com/
//  * Description: This is for filtering products by date
//  * Version: 1.0
//  * Author: Typhoon Media
//  * Author URI: https://alliancecarstg.wpengine.com/
//  */

//   function wl_prodct($data) {
//     wp_cache_flush();

//     $slug = $data->get_param('slug');
//     $args = array(
//             'name' => $slug,
//             'filter[meta]' => true,
//             '_embed' => true,
//         );
//     $p = wc_get_products($args);
//     $products = array();

//     foreach ($p as $product) {
//         $current = $product->get_data();
//         $current_obj = (object) $current;
//         $meta_data = $current_obj->{'meta_data'};

//         $temp = (object) $product->get_data();
//         $temp->start_date = $new_date;
//         $temp->duration = $product->get_meta('duration');
//         $temp->image = wp_get_attachment_image_url($product->image_id, 'full');

//         $class_type = $product->get_meta('class_type');

//         foreach ($class_type as $c_type){
//             if($c_type == "In Person"){
//                 $temp->in_person = true;
//             }
//             if($c_type == "Remote Class"){
//                 $temp->remote_class = true;
//             }
//         }

//         $course_outline_count = $product->get_meta('course_outline');
//         $course_outline = array();

//         for ($x = 0; $x < $course_outline_count; $x+=1) {
//                 $outline = (object) [];
//                 $outline->lesson_name =  $product->get_meta("course_outline_{$x}_lesson_name");

//                 $sub_topics = array();

//                 $sub_topics_count = $product->get_meta("course_outline_{$x}_sub_topics");
//                 for ($y = 0; $y < $sub_topics_count; $y+=1) {
//                     $sub_topic = (object) [];
//                     $sub_topic->sub_topic_name =  $product->get_meta("course_outline_{$x}_sub_topics_{$y}_sub_topic_name");;
//                     $sub_topic->sub_topic_duration =  $product->get_meta("course_outline_{$x}_sub_topics_{$y}_duration");;

//                     $sub_topics[] = $sub_topic;

//                 }
//                 $outline->sub_topics = $sub_topics;

//                 $course_outline[] = $outline;
//             }
//             $temp->course_outline = $course_outline;

//             $course_start_dates_count = $product->get_meta('course_start_dates');
//             $course_start_dates = array();

//             for ($x = 0; $x < $course_start_dates_count; $x+=1) {
//                     $course_start_date = (object) [];

//                     $course_start_date->date = date("Y/m/d", strtotime($product->get_meta("course_start_dates_{$x}_date")));
//                     $course_start_date->start_time = $product->get_meta("course_start_dates_{$x}_start_time");
//                     $course_start_date->end_time = $product->get_meta("course_start_dates_{$x}_end_time");
//                     $course_start_dates[] = $course_start_date;
//             }
//             $temp->course_start_dates = $course_start_dates;

//             $reviews_count = $product->get_meta('reviews');
//             $reviews = array();

//             for ($x = 0; $x < $reviews_count; $x+=1) {
//                 $review = (object) [];
//                 $review->review = $product->get_meta("reviews_{$x}_review");
//                 $review->user = $product->get_meta("reviews_{$x}_user");
//                 $review->review_date = $product->get_meta("reviews_{$x}_review_date");

//                 $reviews[] = $review;
//             }

//             $temp->reviews = $reviews;

//             $products[] = $temp;

//     }

//     return new WP_REST_Response($products, 200);
//  }

//  function wl_prodcts($data) {
//     wp_cache_flush();

//     $args = array(
//             'orderby'  => 'name',
//             'status' => 'publish'
//         );
//     $p = wc_get_products($args);
//     $products = array();
//     $year = $data->get_param('year');

//     foreach ($p as $product) {
//         $current = $product->get_data();
//         $current_obj = (object) $current;
//         $meta_data = $current_obj->{'meta_data'};

//         foreach ($meta_data as $meta){
//             $meta_obj = (object) $meta;
//             $date = $meta_obj->{'value'};
//             $new_date = date("d-m-Y", strtotime($date));
//             $current_year = date('Y',strtotime($date));

//             $is_current_date_el = str_starts_with($meta_obj->{'key'}, 'course_start_dates_');

//             if($is_current_date_el && $current_year == $year ){
//                 $temp = (object) $product->get_data();
//                 $temp->start_date = $new_date;
//                 $temp->duration = $product->get_meta('duration');

//                 $course_outline_count = $product->get_meta('course_outline');
//                 $course_outline = array();

//                 for ($x = 0; $x < $course_outline_count; $x+=1) {
//                     $outline = (object) [];
//                     $outline->lesson_name =  $product->get_meta("course_outline_{$x}_lesson_name");

//                     $sub_topics = array();

//                     $sub_topics_count = $product->get_meta("course_outline_{$x}_sub_topics");;
//                     for ($y = 0; $y < $sub_topics_count; $y+=1) {
//                         $sub_topic = (object) [];
//                         $sub_topic->sub_topic_name =  $product->get_meta("course_outline_{$x}_sub_topics_{$y}_sub_topic_name");;
//                         $sub_topic->sub_topic_duration =  $product->get_meta("course_outline_{$x}_sub_topics_{$y}_duration");;

//                         $sub_topics[] = $sub_topic;

//                     }
//                     $outline->sub_topics = $sub_topics;

//                     $course_outline[] = $outline;
//                 }
//                 $temp->course_outline = $course_outline;

//                 $course_start_dates_count = $product->get_meta('course_start_dates');
//                 $course_start_dates = array();

//                 for ($x = 0; $x < $course_start_dates_count; $x+=1) {
//                     $course_start_date = (object) [];
//                     $course_start_date->date = $product->get_meta("course_start_dates_{$x}_date");
//                     $course_start_date->start_time = $product->get_meta("course_start_dates_{$x}_start_time");
//                     $course_start_date->end_time = $product->get_meta("course_start_dates_{$x}_end_time");
//                     $course_start_dates[] = $course_start_date;
//                 }
//                 $temp->course_start_dates = $course_start_dates;

//                 $products[] = $temp;

//             }
//         }

//         // $product_data = $p->get_meta('course_start_dates_1');
//         // $products[] = $product_data;

//     }

//     return new WP_REST_Response($products, 200);
//  }

//  add_action('rest_api_init', function () {
//      register_rest_route('wl/v1', 'products', [
//          'methods' => 'GET',
//          'callback' => 'wl_prodcts'
//     ]);
//  });

//   add_action('rest_api_init', function () {
//      register_rest_route('wl/v1', 'product', [
//          'methods' => 'GET',
//          'callback' => 'wl_prodct'
//     ]);
//  });
