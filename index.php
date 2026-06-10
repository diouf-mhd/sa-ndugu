<?php include 'includes/db.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sa Ndugu - Kits Cuisine Sénégalais</title>

<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">

<style>
html {
  scroll-behavior: smooth;
}
</style>

</head>
<body class="bg-gray-100 text-gray-800">

<!-- ================= NAVBAR ================= -->
<nav class="bg-green-700 text-white p-4 fixed w-full z-50 shadow">
<div class="container mx-auto flex justify-between items-center">
<h1 class="text-2xl font-bold">Sa Ndugu 🇸🇳</h1>

<div class="hidden md:flex space-x-6">
<a href="#kits" class="hover:text-yellow-300">Nos Kits</a>
<a href="#how" class="hover:text-yellow-300">Comment ça marche</a>
<a href="#faq" class="hover:text-yellow-300">FAQ</a>
<a href="#contact" class="hover:text-yellow-300">Contact</a>
</div>
</div>
</nav>

<div class="h-20"></div>

<!-- ================= HERO ================= -->
<section class="bg-yellow-200 text-center p-12">
<h2 class="text-4xl font-bold mb-4">Aller au marché sans quitter la maison 🛒</h2>
<p class="text-lg mb-6">Commandez votre kit cuisine sénégalais prêt à préparer.</p>
<a href="#kits" class="bg-green-700 text-white px-6 py-3 rounded-lg">
Découvrir les plats
</a>
</section>

<!-- ================= KITS ================= -->
<section id="kits" class="container mx-auto p-6">
<h2 class="text-3xl font-bold text-center mb-8">Nos Kits Sénégalais</h2>

<div class="grid md:grid-cols-3 gap-6">
<?php
$result = $conn->query("SELECT * FROM kits");
while($row = $result->fetch_assoc()):
?>

<div class="bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition">

<img src="<?= $row['image'] ?>" 
class="w-full h-48 object-cover rounded-lg">

<h3 class="text-xl font-bold mt-3"><?= $row['name'] ?></h3>

<p class="text-gray-600 text-sm"><?= $row['description'] ?></p>

<p class="mt-2 text-green-700 font-bold">
<?= $row['base_price'] ?> FCFA / personne
</p>

<select class="persons w-full border p-2 mt-2"
data-price="<?= $row['base_price'] ?>">
<option value="1">1 personne</option>
<option value="2">2 personnes</option>
<option value="3">3 personnes</option>
<option value="4">4 personnes</option>
<option value="5">5 personnes</option>
<option value="6">6 personnes</option>
</select>

<p class="total mt-2 font-bold text-red-600"></p>

<input type="text" placeholder="Nom complet"
class="name w-full border p-2 mt-2 rounded">

<input type="text" placeholder="Adresse de livraison"
class="address w-full border p-2 mt-2 rounded">

<button onclick="orderWhatsApp('<?= $row['name'] ?>', this)"
class="bg-green-600 hover:bg-green-800 text-white w-full p-2 mt-3 rounded-lg">
<i class="fab fa-whatsapp"></i> Commander sur WhatsApp
</button>

</div>

<?php endwhile; ?>
</div>
</section>

<!-- ================= COMMENT CA MARCHE ================= -->
<section id="how" class="bg-white p-12 text-center">
<h2 class="text-3xl font-bold mb-8">Comment ça marche ?</h2>

<div class="grid md:grid-cols-3 gap-8">
<div>
<h3 class="text-xl font-bold">1️⃣ Choisissez</h3>
<p>Sélectionnez votre plat préféré.</p>
</div>

<div>
<h3 class="text-xl font-bold">2️⃣ Sélectionnez</h3>
<p>Indiquez le nombre de personnes.</p>
</div>

<div>
<h3 class="text-xl font-bold">3️⃣ Confirmez</h3>
<p>Validez votre commande sur WhatsApp.</p>
</div>
</div>
</section>

<!-- ================= FAQ ================= -->
<section id="faq" class="p-12 bg-gray-100">
<h2 class="text-3xl font-bold text-center mb-8">FAQ</h2>

<div class="max-w-3xl mx-auto space-y-4">

<div class="bg-white p-4 rounded shadow">
<h3 class="font-bold">Quels sont les moyens de paiement ?</h3>
<p>Espèces, Orange Money, Wave.</p>
</div>

<div class="bg-white p-4 rounded shadow">
<h3 class="font-bold">Livrez-vous à domicile ?</h3>
<p>Oui, livraison partout à Dakar.</p>
</div>

<div class="bg-white p-4 rounded shadow">
<h3 class="font-bold">Combien de temps pour la livraison ?</h3>
<p>Livraison sous 24h.</p>
</div>

</div>
</section>

<!-- ================= CONTACT ================= -->
<section id="contact" class="bg-white p-12 text-center">
<h2 class="text-3xl font-bold mb-6">Contact</h2>
<p>Téléphone : 77 118 39 54</p>
<p>Email : contact@sandugu.sn</p>

<div class="mt-6">
<iframe 
src="https://www.google.com/maps/embed?pb=!1m18..."
width="100%" height="250" style="border:0;" 
allowfullscreen="" loading="lazy">
</iframe>
</div>
</section>

<!-- ================= FOOTER ================= -->
<footer class="bg-green-700 text-white text-center p-4">
© <?php echo date("Y"); ?> Sa Ndugu - Tous droits réservés 🇸🇳
</footer>

<!-- ================= WHATSAPP FLOAT ================= -->
<a href="https://wa.me/221771183954"
class="fixed bottom-5 right-5 bg-green-600 text-white p-4 rounded-full shadow-lg">
<i class="fab fa-whatsapp text-2xl"></i>
</a>

<script src="assets/js/script.js"></script>

</body>
</html>