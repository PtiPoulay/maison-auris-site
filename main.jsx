import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingBag, Search, User, Menu, Star, Truck, ShieldCheck, RotateCcw, Headphones, Heart, ChevronRight, Clock3, Gift, Filter, Edit3, Save, LogOut, Plus, Trash2 } from 'lucide-react';
import './style.css';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Auris Classique Noir",
    gender: "Homme",
    style: "Classique",
    strap: "Acier",
    price: 39.90,
    oldPrice: 69.90,
    badge: "Best-seller",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    description: "Une montre sobre et élégante, idéale pour le travail, les soirées et le quotidien."
  },
  {
    id: 2,
    name: "Auris Rose Élégance",
    gender: "Femme",
    style: "Raffiné",
    strap: "Acier",
    price: 39.90,
    oldPrice: 69.90,
    badge: "Coup de cœur",
    image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?q=80&w=1200&auto=format&fit=crop",
    description: "Une montre féminine, lumineuse et raffinée pour sublimer chaque tenue."
  },
  {
    id: 3,
    name: "Auris Minimal Steel",
    gender: "Mixte",
    style: "Minimaliste",
    strap: "Acier",
    price: 34.90,
    oldPrice: 59.90,
    badge: "Nouveauté",
    image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=1200&auto=format&fit=crop",
    description: "Des lignes simples, modernes et propres pour un style discret mais affirmé."
  },
  {
    id: 4,
    name: "Auris Urban Sport",
    gender: "Homme",
    style: "Sport chic",
    strap: "Silicone",
    price: 44.90,
    oldPrice: 79.90,
    badge: "Offre spéciale",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1200&auto=format&fit=crop",
    description: "Un design dynamique et élégant pour accompagner les journées actives."
  },
  {
    id: 5,
    name: "Auris Cuir Intemporel",
    gender: "Homme",
    style: "Habillé",
    strap: "Cuir",
    price: 42.90,
    oldPrice: 74.90,
    badge: "Élégance accessible",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
    description: "Un bracelet effet cuir et un cadran élégant pour une allure plus habillée."
  },
  {
    id: 6,
    name: "Auris Dorée Fine",
    gender: "Femme",
    style: "Bijou",
    strap: "Acier",
    price: 36.90,
    oldPrice: 64.90,
    badge: "Tendance",
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=1200&auto=format&fit=crop",
    description: "Une montre fine et élégante, parfaite avec des bijoux dorés ou une tenue chic."
  }
];

const ADMIN_PASSWORD = "auris-admin";

function formatPrice(value) {
  return Number(value || 0).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("maison_auris_products");
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem("maison_auris_products", JSON.stringify(products));
  }, [products]);

  return [products, setProducts];
}

function Header({ setPage }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const links = [
    ["Accueil", "home"],
    ["Collections", "collections"],
    ["Avis", "avis"],
    ["FAQ", "faq"],
    ["Admin", "admin"]
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <button onClick={() => setPage("home")} className="logo">Maison <span>Auris</span></button>
        <nav className="desktop-nav">
          {links.map(([label, page]) => (
            <button key={page} onClick={() => setPage(page)}>{label}</button>
          ))}
        </nav>
        <div className="icons">
          <Search size={20} />
          <User size={20} />
          <ShoppingBag size={20} />
        </div>
        <button className="mobile-btn" onClick={() => setMobileMenu(!mobileMenu)}><Menu /></button>
      </div>
      {mobileMenu && (
        <nav className="mobile-nav">
          {links.map(([label, page]) => (
            <button key={page} onClick={() => { setPage(page); setMobileMenu(false); }}>{label}</button>
          ))}
        </nav>
      )}
    </header>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
        <span className="badge">{product.badge}</span>
        <button className="heart"><Heart size={20} /></button>
      </div>
      <div className="product-content">
        <div className="product-meta">
          <span>{product.gender}</span>
          <span>{product.style}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price-row">
          <strong>{formatPrice(product.price)}</strong>
          <span>{formatPrice(product.oldPrice)}</span>
        </div>
        <button className="cart-btn">Ajouter au panier</button>
      </div>
    </article>
  );
}

function Home({ products, setPage }) {
  const [category, setCategory] = useState("Tous");
  const [sort, setSort] = useState("popularite");

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (category !== "Tous") {
      list = list.filter(p => p.gender === category || p.style === category || p.strap === category);
    }
    if (sort === "prix-croissant") list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "prix-decroissant") list.sort((a, b) => Number(b.price) - Number(a.price));
    return list;
  }, [products, category, sort]);

  return (
    <>
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="pill"><Clock3 size={16} /> Élégance accessible pour homme et femme</div>
          <h1>Le temps passe. <span>Votre style reste.</span></h1>
          <p>Découvrez une sélection de montres modernes, raffinées et accessibles, pensées pour sublimer chaque instant de votre quotidien.</p>
          <div className="hero-actions">
            <button onClick={() => setPage("collections")} className="gold-btn">Découvrir la collection <ChevronRight size={20} /></button>
            <button className="outline-btn">Notre univers</button>
          </div>
          <div className="trust-line">Livraison suivie • Paiement sécurisé • Retours sous 14 jours</div>
        </div>
      </section>

      <section className="strip">
        <span>Style premium</span>
        <span>Montres sélectionnées avec soin</span>
        <span>Prix accessibles</span>
      </section>

      <section className="section" id="collections">
        <div className="section-head">
          <div>
            <p className="eyebrow">Meilleures ventes</p>
            <h2>Nos montres les plus appréciées</h2>
            <p>Des modèles sélectionnés pour leur style, leur élégance et leur facilité à s’adapter à toutes les occasions.</p>
          </div>
          <div className="controls">
            <label><Filter size={16} />
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option>Tous</option>
                <option>Homme</option>
                <option>Femme</option>
                <option>Mixte</option>
                <option>Acier</option>
                <option>Cuir</option>
                <option>Minimaliste</option>
                <option>Sport chic</option>
              </select>
            </label>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="popularite">Popularité</option>
              <option value="prix-croissant">Prix croissant</option>
              <option value="prix-decroissant">Prix décroissant</option>
            </select>
          </div>
        </div>
        <div className="product-grid">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <Benefits />
      <Story />
      <GiftSection />
      <Reviews />
      <FAQ />
      <Newsletter />
    </>
  );
}

function Benefits() {
  const benefits = [
    [Truck, "Livraison suivie", "Recevez un lien de suivi dès l’expédition de votre commande."],
    [ShieldCheck, "Paiement sécurisé", "Vos paiements sont protégés par des solutions fiables."],
    [RotateCcw, "Retours sous 14 jours", "Vous disposez d’un délai légal de rétractation après réception."],
    [Headphones, "Support client", "Une question ? Notre équipe vous répond sous 24 à 48 h ouvrées."]
  ];

  return (
    <section className="benefits">
      {benefits.map(([Icon, title, text]) => (
        <div className="benefit" key={title}>
          <Icon />
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </section>
  );
}

function Story() {
  return (
    <section className="story">
      <div className="story-image">
        <img src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1200&auto=format&fit=crop" alt="Maison Auris" />
      </div>
      <div>
        <p className="eyebrow">Notre histoire</p>
        <h2>L’élégance accessible</h2>
        <p>Chez Maison Auris, nous pensons qu’une montre n’est pas seulement un accessoire. C’est un détail qui affirme une personnalité, complète une tenue et accompagne les moments importants.</p>
        <p>Notre mission est simple : proposer des montres modernes, élégantes et accessibles, soigneusement sélectionnées pour leur style.</p>
      </div>
    </section>
  );
}

function GiftSection() {
  return (
    <section className="gift">
      <div>
        <div className="pill light"><Gift size={16} /> Idée cadeau élégante</div>
        <h2>Une attention qui marque le temps</h2>
        <p>Anniversaire, fête, Saint-Valentin, Noël ou simple attention : une montre reste un cadeau intemporel, utile et toujours apprécié.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=900&auto=format&fit=crop" alt="Montre cadeau" />
    </section>
  );
}

function Reviews() {
  const reviews = [
    ["Thomas L.", "Très belle montre, encore plus élégante en vrai. Elle fait vraiment son effet avec une chemise."],
    ["Clara M.", "Je l’ai offerte à mon compagnon, il l’a adorée. Le style est propre et moderne."],
    ["Julien R.", "Bon rapport qualité/prix. Livraison un peu longue mais le suivi était clair."]
  ];

  return (
    <section className="section">
      <div className="center">
        <p className="eyebrow">Avis clients</p>
        <h2>Ils ont choisi Maison Auris</h2>
      </div>
      <div className="review-grid">
        {reviews.map(([name, text]) => (
          <div className="review" key={name}>
            <div className="stars">{[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}</div>
            <p>“{text}”</p>
            <strong>— {name}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    ["Quels sont les délais de livraison ?", "Les délais moyens sont de 7 à 15 jours ouvrés après expédition. La préparation peut prendre 2 à 5 jours ouvrés."],
    ["Puis-je retourner ma commande ?", "Oui. Vous disposez d’un délai de 14 jours après réception pour exercer votre droit de rétractation."],
    ["Les montres sont-elles étanches ?", "Cela dépend du modèle. Les informations précises doivent être vérifiées sur chaque fiche produit avant publication."],
    ["Le paiement est-il sécurisé ?", "Oui. Les paiements sont traités via des solutions sécurisées et reconnues."]
  ];

  return (
    <section className="faq">
      <p className="eyebrow">FAQ</p>
      <h2>Questions fréquentes</h2>
      {faqs.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}

function Newsletter() {
  return (
    <section className="newsletter">
      <p className="eyebrow">Newsletter</p>
      <h2>Rejoignez le cercle Maison Auris</h2>
      <p>Recevez nos nouveautés, offres privées et conseils style directement par email.</p>
      <form onSubmit={e => e.preventDefault()}>
        <input type="email" placeholder="Votre adresse email" />
        <button>S’inscrire</button>
      </form>
    </section>
  );
}

function Collections({ products }) {
  return (
    <section className="section page">
      <p className="eyebrow">Catalogue</p>
      <h1>Toutes nos montres</h1>
      <p className="page-intro">Découvrez notre sélection complète de montres modernes et élégantes.</p>
      <div className="product-grid">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}

function Admin({ products, setProducts }) {
  const [logged, setLogged] = useState(() => localStorage.getItem("maison_auris_admin") === "true");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("maison_auris_admin", "true");
      setLogged(true);
    } else {
      alert("Mot de passe incorrect");
    }
  }

  function updateProduct(id, field, value) {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: field.includes("price") || field.includes("Price") ? Number(value) : value } : p));
  }

  function addProduct() {
    const id = Date.now();
    setProducts([...products, {
      id,
      name: "Nouvelle montre",
      gender: "Mixte",
      style: "Élégant",
      strap: "Acier",
      price: 39.90,
      oldPrice: 69.90,
      badge: "Nouveauté",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      description: "Description courte de la montre."
    }]);
  }

  function removeProduct(id) {
    if (confirm("Supprimer cette montre ?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  }

  function resetProducts() {
    if (confirm("Réinitialiser tous les produits ?")) {
      setProducts(DEFAULT_PRODUCTS);
    }
  }

  if (!logged) {
    return (
      <section className="admin-login">
        <form onSubmit={login}>
          <Edit3 />
          <h1>Espace admin</h1>
          <p>Connecte-toi pour modifier les montres, images, prix et textes.</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe admin" />
          <button>Connexion</button>
          <small>Mot de passe par défaut : auris-admin</small>
        </form>
      </section>
    );
  }

  return (
    <section className="admin page">
      <div className="admin-head">
        <div>
          <p className="eyebrow">Administration</p>
          <h1>Modifier les montres</h1>
          <p>Colle l’URL d’une image pour modifier la photo d’une montre. Les changements sont sauvegardés dans ton navigateur.</p>
        </div>
        <div className="admin-actions">
          <button onClick={addProduct}><Plus size={18} /> Ajouter</button>
          <button onClick={resetProducts}>Réinitialiser</button>
          <button onClick={() => { localStorage.removeItem("maison_auris_admin"); setLogged(false); }}><LogOut size={18} /> Déconnexion</button>
        </div>
      </div>

      <div className="admin-grid">
        {products.map(product => (
          <div className="admin-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="admin-fields">
              <label>Nom<input value={product.name} onChange={e => updateProduct(product.id, "name", e.target.value)} /></label>
              <label>Image URL<input value={product.image} onChange={e => updateProduct(product.id, "image", e.target.value)} /></label>
              <div className="two">
                <label>Prix<input type="number" step="0.01" value={product.price} onChange={e => updateProduct(product.id, "price", e.target.value)} /></label>
                <label>Prix barré<input type="number" step="0.01" value={product.oldPrice} onChange={e => updateProduct(product.id, "oldPrice", e.target.value)} /></label>
              </div>
              <div className="two">
                <label>Genre<input value={product.gender} onChange={e => updateProduct(product.id, "gender", e.target.value)} /></label>
                <label>Style<input value={product.style} onChange={e => updateProduct(product.id, "style", e.target.value)} /></label>
              </div>
              <label>Badge<input value={product.badge} onChange={e => updateProduct(product.id, "badge", e.target.value)} /></label>
              <label>Description<textarea value={product.description} onChange={e => updateProduct(product.id, "description", e.target.value)} /></label>
              <button className="delete" onClick={() => removeProduct(product.id)}><Trash2 size={18} /> Supprimer</button>
            </div>
          </div>
        ))}
      </div>
      <div className="admin-note">
        <Save size={18} />
        Les modifications sont enregistrées automatiquement en localStorage. Pour une vraie boutique en ligne avec modifications visibles par tous, il faudra brancher Supabase, Firebase ou un back-office.
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <p className="footer-logo">Maison <span>Auris</span></p>
          <p>L’élégance du temps, accessible à tous. Des montres modernes et raffinées pour accompagner chaque instant.</p>
        </div>
        <div>
          <h4>Boutique</h4>
          <button onClick={() => setPage("collections")}>Collections</button>
          <button onClick={() => setPage("home")}>Montres Homme</button>
          <button onClick={() => setPage("home")}>Montres Femme</button>
        </div>
        <div>
          <h4>Informations</h4>
          <button onClick={() => setPage("faq")}>FAQ</button>
          <button>Livraison & retours</button>
          <button>Contact</button>
          <button>Mentions légales</button>
        </div>
      </div>
      <div className="copyright">© 2026 Maison Auris. Tous droits réservés.</div>
    </footer>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useProducts();

  return (
    <div>
      <Header setPage={setPage} />
      {page === "home" && <Home products={products} setPage={setPage} />}
      {page === "collections" && <Collections products={products} />}
      {page === "avis" && <Reviews />}
      {page === "faq" && <FAQ />}
      {page === "admin" && <Admin products={products} setProducts={setProducts} />}
      <Footer setPage={setPage} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
