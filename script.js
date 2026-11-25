const cards = [...document.querySelectorAll(".event-card")];
const categoryButtons = [...document.querySelectorAll(".category-card")];
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");
let selectedCategory = "all";
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function filterEvents() {
  const query = searchInput.value.trim().toLowerCase();
  const location = locationFilter.value;
  let visibleCount = 0;

  cards.forEach((card) => {
    const categoryMatches = selectedCategory === "all" || card.dataset.category === selectedCategory;
    const locationMatches = location === "all" || card.dataset.location === location;
    const textMatches = !query || card.dataset.title.includes(query) || card.textContent.toLowerCase().includes(query);
    const visible = categoryMatches && locationMatches && textMatches;
    card.style.display = visible ? "" : "none";
    if (visible) visibleCount += 1;
  });

  emptyState.style.display = visibleCount ? "none" : "block";
}

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  filterEvents();
  document.getElementById("events").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", filterEvents);
locationFilter.addEventListener("change", filterEvents);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = button.dataset.category;
    filterEvents();
    document.getElementById("events").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("saved");
    const saved = button.classList.contains("saved");
    button.setAttribute("aria-label", saved ? "إلغاء حفظ الفعالية" : "حفظ الفعالية");
    showToast(saved ? "تمت إضافة الفعالية للمفضلة" : "تمت إزالة الفعالية من المفضلة");
  });
});

document.querySelectorAll(".register-button").forEach((button) => {
  button.addEventListener("click", () => {
    const registered = button.classList.toggle("registered");
    button.textContent = registered ? "تم التسجيل ✓" : "سجل الآن";
    showToast(registered ? "تم تسجيلك في الفعالية بنجاح" : "تم إلغاء التسجيل");
  });
});

document.getElementById("viewAll").addEventListener("click", () => {
  selectedCategory = "all";
  searchInput.value = "";
  locationFilter.value = "all";
  categoryButtons.forEach((item) => item.classList.toggle("active", item.dataset.category === "all"));
  filterEvents();
});

document.getElementById("createEvent").addEventListener("click", () => {
  showToast("يمكن لمسؤول الأنشطة إضافة فعالية جديدة قريباً");
});

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
