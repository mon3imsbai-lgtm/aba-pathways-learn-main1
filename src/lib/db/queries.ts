import { supabase } from "@/integrations/supabase/client"
import type { Database } from "@/integrations/supabase/types"

type Tables = Database["public"]["Tables"]
type Course = Tables["courses"]["Row"]
type Product = Tables["products"]["Row"]
type Service = Tables["services"]["Row"]
type BlogPost = Tables["blog_posts"]["Row"]
type Testimonial = Tables["testimonials"]["Row"]
type FaqItem = Tables["faq_items"]["Row"]
type Feature = Tables["features"]["Row"]
type Category = Tables["categories"]["Row"]
type ContactMessage = Tables["contact_messages"]["Row"]
type RefundRequest = Tables["refund_requests"]["Row"]
type Order = Tables["orders"]["Row"]
type OrderItem = Tables["order_items"]["Row"]
type Enrollment = Tables["enrollments"]["Row"]
type CourseModule = Tables["course_modules"]["Row"]

export { type Course, type Product, type Service, type BlogPost, type Testimonial, type FaqItem, type Feature, type Category, type ContactMessage, type RefundRequest, type Order, type OrderItem, type Enrollment, type CourseModule }

// ==================== PUBLIC QUERIES ====================

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()
  if (error) return null
  return data
}

export async function getFeaturedCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function getCourseModules(courseId: number): Promise<CourseModule[]> {
  const { data, error } = await supabase
    .from("course_modules")
    .select("*")
    .eq("course_id", courseId)
    .order("order_index", { ascending: true })
  if (error) throw error
  return data || []
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_categories!inner(
        categories!inner(slug)
      )
    `)
    .eq("is_active", true)
    .eq("product_categories.categories.slug", categorySlug)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true })
  if (error) throw error
  return data || []
}

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true })
  if (error) throw error
  return data || []
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()
  if (error) return null
  return data
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const { data, error } = await supabase
    .from("faq_items")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true })
  if (error) throw error
  return data || []
}

export async function getFeatures(): Promise<Feature[]> {
  const { data, error } = await supabase
    .from("features")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true })
  if (error) throw error
  return data || []
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value")
  if (error) throw error
  return (data || []).reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})
}

// ==================== FORM SUBMISSIONS ====================

export async function submitContactMessage(input: {
  full_name: string
  email: string
  request_type: string
  message: string
}): Promise<ContactMessage> {
  const { data, error } = await supabase
    .from("contact_messages")
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function submitRefundRequest(input: {
  full_name: string
  registration_number: string
  email: string
  bank_rib: string
  account_holder: string
  bank_name: string
  reason?: string
}): Promise<RefundRequest> {
  const { data, error } = await supabase
    .from("refund_requests")
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data
}

// ==================== ORDERS ====================

export async function createOrder(input: {
  user_id?: string
  total_amount: number
  items: { product_id: number; quantity: number; unit_price: number }[]
}): Promise<Order> {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: input.user_id,
      total_amount: input.total_amount,
      status: "pending",
    })
    .select()
    .single()
  if (orderError) throw orderError

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(
      input.items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      }))
    )
  if (itemsError) throw itemsError

  return order
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function getRefundRequests(): Promise<RefundRequest[]> {
  const { data, error } = await supabase
    .from("refund_requests")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data || []
}

export async function getOrderItems(orderId: number): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId)
  if (error) throw error
  return data || []
}

// ==================== ENROLLMENTS ====================

export async function createEnrollment(input: {
  user_id: string
  course_id: number
}): Promise<Enrollment> {
  const { data, error } = await supabase
    .from("enrollments")
    .insert({
      user_id: input.user_id,
      course_id: input.course_id,
      status: "pending",
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getUserEnrollments(userId: string): Promise<Enrollment[]> {
  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", userId)
    .order("enrolled_at", { ascending: false })
  if (error) throw error
  return data || []
}

// ==================== ADMIN QUERIES ====================

export async function adminCreateCourse(input: Tables["courses"]["Insert"]) {
  const { data, error } = await supabase
    .from("courses")
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateCourse(id: number, input: Tables["courses"]["Update"]) {
  const { data, error } = await supabase
    .from("courses")
    .update(input)
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminDeleteCourse(id: number) {
  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export async function adminCreateProduct(input: Tables["products"]["Insert"]) {
  const { data, error } = await supabase
    .from("products")
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateProduct(id: number, input: Tables["products"]["Update"]) {
  const { data, error } = await supabase
    .from("products")
    .update(input)
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminDeleteProduct(id: number) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export async function adminCreateService(input: Tables["services"]["Insert"]) {
  const { data, error } = await supabase
    .from("services")
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateService(id: number, input: Tables["services"]["Update"]) {
  const { data, error } = await supabase
    .from("services")
    .update(input)
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminDeleteService(id: number) {
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export async function adminCreateBlogPost(input: Tables["blog_posts"]["Insert"]) {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateBlogPost(id: number, input: Tables["blog_posts"]["Update"]) {
  const { data, error } = await supabase
    .from("blog_posts")
    .update(input)
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminDeleteBlogPost(id: number) {
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export async function adminCreateTestimonial(input: Tables["testimonials"]["Insert"]) {
  const { data, error } = await supabase
    .from("testimonials")
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateTestimonial(id: number, input: Tables["testimonials"]["Update"]) {
  const { data, error } = await supabase
    .from("testimonials")
    .update(input)
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminDeleteTestimonial(id: number) {
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export async function adminCreateFaqItem(input: Tables["faq_items"]["Insert"]) {
  const { data, error } = await supabase
    .from("faq_items")
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateFaqItem(id: number, input: Tables["faq_items"]["Update"]) {
  const { data, error } = await supabase
    .from("faq_items")
    .update(input)
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminDeleteFaqItem(id: number) {
  const { error } = await supabase
    .from("faq_items")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export async function adminCreateFeature(input: Tables["features"]["Insert"]) {
  const { data, error } = await supabase
    .from("features")
    .insert(input)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateFeature(id: number, input: Tables["features"]["Update"]) {
  const { data, error } = await supabase
    .from("features")
    .update(input)
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminDeleteFeature(id: number) {
  const { error } = await supabase
    .from("features")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export async function adminUpdateContactMessageStatus(
  id: number,
  status: ContactMessage["status"]
) {
  const { data, error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateRefundRequestStatus(
  id: number,
  status: RefundRequest["status"]
) {
  const { data, error } = await supabase
    .from("refund_requests")
    .update({ status })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateOrderStatus(
  id: number,
  status: Order["status"]
) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function adminUpdateSiteSetting(key: string, value: string) {
  const { data, error } = await supabase
    .from("site_settings")
    .upsert({ key, value })
    .select()
    .single()
  if (error) throw error
  return data
}

// ==================== STORAGE ====================

export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true })
  if (error) throw error
  return data
}

export async function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])
  if (error) throw error
}
