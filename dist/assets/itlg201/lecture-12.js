(() => {
  const pesticides = "Potential Health Effects of Pesticides (1).pdf";
  const swimming = "Turns Out Swimming in the Sea Is Actually Kind of Bad for You (1).pdf";
  const pages = (from, to = from) => Array.from({ length: to - from + 1 }, (_, index) => from + index);

  const pesticideText = {
    intro: "Because pesticides are toxic, they are also potentially hazardous to humans, animals, other organisms, and the environment. Therefore, people who use pesticides or regularly come in contact with them must understand the relative toxicity, potential health effects, and preventative measures to reduce exposure to the products they use.",
    hazard: "Hazard, or risk, of using pesticides is the potential for injury, or the degree of danger involved in using a pesticide under a given set of conditions. Hazard depends on the toxicity of the pesticide and the amount of exposure to the pesticide and is often illustrated with the following equation:",
    formula: "Hazard = Toxicity x Exposure",
    toxicity: "The toxicity of a pesticide is a measure of its capacity or ability to cause injury or illness. The toxicity of a particular pesticide is determined by subjecting test animals to varying dosages of the active ingredient (a.i.) and each of its formulated products. The active ingredient is the chemical component in the pesticide product that controls the pest. By understanding the difference in toxicity levels of pesticides, a user can minimize the potential hazard by selecting the pesticide with the lowest toxicity that will control the pest.",
    applicators: "Applicators may have little or no control over the availability of low-toxicity products or the toxicity of specific formulated products. However, applicators can minimize or nearly eliminate exposure--and thus reduce hazard--by following the label instructions, using personal protective clothing and equipment (PPE), and handling the pesticide properly. For example, more than 95 percent of all pesticide exposures come from dermal exposure, primarily to the hands and forearms. By wearing a pair of unlined, chemical-resistant gloves, this type of exposure can be nearly eliminated.",
    acute: "Acute toxicity of a pesticide refers to the chemical's ability to cause injury to a person or animal from a single exposure, generally of short duration. The harmful effects that occur from a single exposure by any route of entry are termed \"acute effects.\" The four routes of exposure are dermal (skin), inhalation (lungs), oral (mouth), and the eyes. Acute toxicity is determined by examining the dermal toxicity, inhalation toxicity, and oral toxicity of test animals. In addition, eye and skin irritation are also examined.",
    measure: "Acute toxicity is measured as the amount or concentration of a toxicant--the a.i.--required to kill 50 percent of the animals in a test population. This measure is usually expressed as the LD50 (lethal dose 50) or the LC50 (lethal concentration 50). Additionally, the LD50 and LC50 values are based on a single dosage and are recorded in milligrams of pesticide per kilogram of body weight (mg/kg) of the test animal or in parts per million (ppm). LD50 and LC50 values are useful in comparing the toxicities of different active ingredients and different formulations containing the same active ingredient. The lower the LD50 or LC50 value of a pesticide product, the greater its toxicity to humans and animals. Pesticides with a high LD50 are the least toxic to humans if used according to the directions on the product label.",
    chronic: "The chronic toxicity of a pesticide is determined by subjecting test animals to long-term exposure to the active ingredient. Any harmful effects that occur from small doses repeated over a period of time are termed \"chronic effects.\" Suspected chronic effects from exposure to certain pesticides include birth defects, toxicity to a fetus, production of benign or malignant tumors, genetic changes, blood disorders, nerve disorders, endocrine disruption, and reproduction effects. The chronic toxicity of a pesticide is more difficult than acute toxicity to determine through laboratory analysis.",
    firstCategory: "Products are categorized on the basis of their relative acute toxicity (their LD50 or LC50 values). Pesticides that are classified as highly toxic (Toxicity Category I) on the basis of either oral, dermal, or inhalation toxicity must have the signal words DANGER and POISON printed in red with a skull and crossbones symbol prominently displayed on the front panel of the package label. The Spanish equivalent for DANGER, \"PELIGRO,\" must also appear on the labels of highly toxic chemicals. The acute (single dosage) oral LD50 for pesticide products in this group ranges from a trace amount to 50 mg/kg. For example, exposure of a few drops of a material taken orally could be fatal to a 150-pound person.",
    dangerAlone: "Some pesticide products have just the signal word DANGER, which tells you nothing about the acute toxicity, just that the product can cause severe eye damage or severe skin irritation.",
    secondCategory: "Pesticide products considered moderately toxic (Toxicity Category II) must have the signal word WARNING and \"AVISO\" (the Spanish equivalent) displayed on the product label. In this category, the acute oral LD50 ranges from 50 to 500 mg/kg. A teaspoon to an ounce of this material could be fatal to a 150-pound person.",
    otherCategories: "Pesticide products classified as either slightly toxic or relatively nontoxic (Toxicity Categories III and IV) are required to have the signal word CAUTION on the pesticide label. Acute oral LD50 values in this group are greater than 500 mg/kg. An ounce or more of this material could be fatal to a 150-pound person.",
    tableOne: "Table 1 summarizes the LD50 and LC50 values for each route of exposure for the four toxicity categories and their associated signal word. For example, an active ingredient with a dermal LD50 of 1,000 mg/kg would be in Toxicity Category II with a WARNING signal word. Keep in mind that an active ingredient may have a high LD50 placing it in a Toxicity Category II, III, or IV but also have corrosive eye/skin effects that take priority and place it in Toxicity Category I.",
    msds: "All pesticide toxicity values, including the LD50, can be found on the product's Material Safety Data Sheet (MSDS). Pesticide labels and MSDS can be obtained from retailers or manufactures. In addition, most products also have information that can be found on the Internet.",
    symptomVariation: "The symptoms of pesticide poisoning can range from a mild skin irritation to coma or even death. Different classes or families of chemicals cause different types of symptoms. Individuals also vary in their sensitivity to different levels of these chemicals. Some people may show no reaction to an exposure that may cause severe illness in others. Because of potential health concerns, pesticide users and handlers must recognize the common signs and symptoms of pesticide poisoning.",
    topical: "The effects, or symptoms, of pesticide poisoning can be broadly defined as either topical or systemic. Topical effects generally develop at the site of pesticide contact and are a result of either the pesticide's irritant properties (either the active and/or inert ingredient) or an allergic response by the victim. Dermatitis, or inflammation of the skin, is accepted as the most commonly reported topical effect associated with pesticide exposure. Symptoms of dermatitis range from reddening of the skin to rashes and/or blisters.",
    irritation: "Some individuals tend to cough, wheeze, or sneeze when exposed to pesticide sprays. Some individuals react to the strong odor and irritating effects of petroleum distillates used as carriers in pesticide products. One symptom is that the eyes, mucous membranes of the nose, and even the sensitive linings of the mouth and back of the throat feel raw and scratchy. This symptom usually subsides within a few minutes after a person is removed from the exposure to the irritant. However, a reaction to a pesticide product that causes someone not only to sneeze and cough but also to develop severe acute respiratory symptoms is more likely to be a true hypersensitivity or allergic reaction. Symptoms of a true allergic reaction range from reddening and itching of the eyes and skin to respiratory discomfort often resembling an asthmatic condition.",
    systemic: "Systemic effects are quite different from topical effects. They often occur away from the original point of contact as a result of the pesticide being absorbed into and distributed throughout the body. Systemic effects often include nausea, vomiting, fatigue, headache, and intestinal disorders. In advanced poisoning cases, the individual may experience changes in heart rate, difficulty breathing, convulsions, and coma, which could lead to death.",
    medicalHelp: "Be alert for the early signs and symptoms of pesticide poisoning in yourself and others. These often occur immediately after exposure, but they could be delayed for up to 24 hours. If you are having symptoms but are unsure if they are pesticide related, at least notify someone in case your symptoms become worse. But when symptoms appear after contact with pesticides, you should seek medical attention immediately. At this time, call the National Poison Center at 1-800-222-1222 for guidance on the proper response to your symptoms. This number will direct your call to the nearest poison center, which is staffed on a 24-hour basis.",
    labelInfo: "If safe to do so, take the pesticide container to the telephone. (However, if the pesticide container is contaminated, write down the product name, active ingredient(s) and percentage, and the EPA registration number.) The product label provides medical personnel information such as active ingredients, an antidote, and an emergency contact number for the manufacturer. If the Material Safety Data Sheet is available, take this also because it contains additional information for medical personnel.",
    container: "If you must go to the hospital or doctor's office, take the entire pesticide container, including the label, with you. In order to avoid inhaling fumes or spilling the contents, make sure the container is tightly sealed and place into a plastic bag if possible. The pesticide container should never be placed in the enclosed passenger section of your vehicle.",
    fungicide: "The acute toxicity of fungicides to humans is generally considered to be low, but fungicides can be irritating to the skin and eyes. Inhalation of spray mist or dust from these pesticides may cause throat irritation, sneezing, and coughing. Chronic exposures to lower concentrations of fungicides can cause adverse health effects. Most cases of human fungicide poisonings have been from consumption of seed grain. To prevent these types of poisonings, fungicide treatment now includes a brightly colored dye to clearly indicate that the seed has been treated. Table 2 summarizes the signs and symptoms of acute exposures to commonly used fungicides.",
    insecticide: "Insecticides cause the greatest number of pesticide poisonings in the United States. The most serious pesticide poisonings usually result from acute exposure to organophosphate and carbamate insecticides. Organophosphate insecticides include chlorpyrifos, diazinon, dimethoate, disulfoton, malathion, methyl parathion, and ethyl parathion. The carbamate compounds include carbaryl, carbofuran, methomyl, and oxamyl. Organophosphates and carbamates inhibit the enzyme cholinesterase, causing a disruption of the nervous system. All life forms with cholinesterase in their nervous system, such as insects, fish, birds, humans, and other mammals, can be poisoned by these chemicals.",
    tableFour: "Table 4 summarizes the signs and symptoms from acute exposures to commonly used insecticides.",
    nervousSystem: "To understand how the organophosphate and carbamate insecticides affect the nervous system, one needs to understand how the nervous system actually works. The nervous system, which includes the brain, is the most complex system in the body consisting of millions of cells that make up a communications system within the organism. Messages or electrical impulses (stimuli) travel along this complex network of cells. Nerve cells or neurons do not physically touch each other; rather there is a gap or synapse between cells. The impulses must cross or \"bridge\" the synapse between nerve cells in order to keep the message moving along the entire network.",
    impulse: "When an impulse reaches the synapse, the chemical acetylcholine is released to carry the message on to the next cell. Acetylcholine is the primary chemical responsible for the transmission of nerve impulses across the synapse of two neurons. After the impulse is transmitted across the synapse, the acetylcholine is broken down by the enzyme cholinesterase. Once this occurs, the synapse is \"cleared\" and ready to receive a new transmission.",
    inhibit: "Organophosphate and carbamate insecticides inhibit the activity of cholinesterase, resulting in a buildup of acetylcholine in the body. An increase in acetylcholine results in the uncontrolled flow of nerve transmissions between nerve cells. The nervous system becomes \"poisoned\"; the accumulation of acetylcholine causes the continual transmission of impulses across the synapses.",
    combinedSymptoms: "The effects of organophosphate or carbamate poisoning can result in both systemic and topical symptoms. Direct exposure of the eye, for example, can cause topical symptoms such as constriction of the pupils, blurry vision, an eyebrow headache, and severe irritation and reddening of the eyes. Symptoms and signs of systemic poisonings are almost entirely due to the accumulation of acetylcholine at the nerve endings.",
    onset: "The onset of symptoms depends on the route of entry and the severity of the poisoning. Gastric symptoms such as stomach cramps, nausea, vomiting, and diarrhea appear early if the material has been ingested. Similarly, salivation, headache, dizziness, and excessive secretions that cause breathing difficulties are initial symptoms if the material has been inhaled. Involvement of the respiratory muscles can result in respiratory failure. Stomach, intestinal, and respiratory symptoms usually appear at the same time if the pesticide is absorbed through the skin. In children, the first symptom of poisoning may be a convulsion.",
    advanced: "In advanced poisonings, the victim is pale, sweating, and frothing at the mouth. The pupils are constricted and unresponsive to light. Other symptoms include changes in heart rate, muscle weakness, mental confusion, convulsions, and/or coma. The victim may die if not treated.",
    baseline: "Those who regularly work with organophosphates and carbamates should consider having periodic cholinesterase tests. The blood cholinesterase test measures the effect of exposure to organophosphate and carbamate insecticides. Since cholinesterase levels can vary considerably among individuals, a \"baseline\" must be established for each person. In fact, a small percentage of the population has a genetically determined low level of cholinesterase. Even minimal exposure to cholinesterase inhibitors can present a substantial risk to these people. Baseline testing should always be done during the time of year when pesticides are not being used, or at least 30 days from the most recent exposure. Establishing a baseline value often requires two tests performed at least 72 hours apart but within 14 days of each other. If the test results differ by as much as 20 percent, a third test is often recommended.",
    monitoring: "Cholinesterase tests can be repeated during times when organophosphate and carbamate insecticides are being used and then compared with the baseline level. The purpose of routine cholinesterase monitoring is to enable a physician to recognize the occurrence of excessive exposure to organophosphates and carbamates. If a laboratory test shows a cholinesterase drop of 30 percent below the established baseline, the worker should be retested immediately. If a second test confirms the drop in cholinesterase, the pesticide handler or agricultural worker should be removed from further contact with organophosphate and carbamate insecticides until cholinesterase levels return to the preexposure baseline range. Your primary care physician can help to establish the frequency of this testing program.",
    prevention: "As mentioned earlier, the hazard or risk involved with using a pesticide depends on both the toxicity of the product and the amount of exposure to the product (Hazard = Toxicity x Exposure). Ideally, use a low-toxicity product when possible, but even they can be harmful if your exposure level is high. However, regardless of the product's toxicity, if the exposure level is low, then the hazard will also be low. To reduce the possibility of exposure and to protect your health, always wear the personal protective equipment (PPE) as indicated on the product label. The following are general PPE guidelines to protect against the four routes of entry.",
    dermal: "More than 95 percent of all exposures are dermal. Dermal absorption may occur as the result of a splash, spill, or drift or when cleaning or repairing equipment. Wear unlined, chemical-resistant gloves to eliminate most dermal exposures. Minimum dermal protection for most pesticides consists of a long-sleeved shirt, long trousers, gloves, and proper footwear. For extra precaution, consider wearing coveralls, a waterproof hat, and unlined rubber boots. Additionally, wearing a liquid-proof apron or rain suit is recommended when mixing and pouring concentrates or when using highly toxic products.",
    inhalation: "For many toxic chemicals, the respiratory (breathing) system is the quickest and most direct route of entry into the circulatory system. Respiratory protection is especially important when pesticide powders, dusts, gases, vapors, or small spray droplets can be inhaled.",
    respirator: "Use the respirator as designed for its intended use, and always follow the manufacturer's instructions. Select only equipment approved by the National Institute of Occupational Safety and Health (NIOSH) and the Mine Safety and Health Administration (MSHA).",
    oral: "Accidental oral exposure most frequently occurs when pesticides have been taken from the original container and put into an unlabeled bottle or food container. Unfortunately, children are the most common victims in these situations. Store pesticides only in their original containers, and keep the original label attached to the container. Store pesticides only in their original containers and keep the original label attached to the container. Store in a locked cabinet and/or on a high shelf to keep out of the reach of children. Never use your mouth to clear a spray line or to siphon a pesticide from a tank or container. After handling or working with pesticides, wash your hands and face thoroughly with soap and water before eating, drinking, or smoking.",
    eyes: "Eyes are very sensitive to many pesticides and, considering their size, are able to absorb large amounts of chemical. Serious eye exposure can result from a splash, spill, or drift or by rubbing the eyes with contaminated hands or clothing. Tight-fitting chemical splash goggles or a full-face shield should be worn if there is any chance of getting pesticides in the eyes, especially when pouring or mixing concentrates and handling dusts. When pouring from a container, keep the container below eye level to avoid splashing or spilling chemicals on your face or protective clothing.",
    summary: "All pesticides have the potential to be harmful to humans, animals, other living organisms, and the environment if used incorrectly. The key to reducing health hazards when using pesticides is to always limit your exposure by wearing PPE and use a low-toxicity pesticide when available. Reading the label and practicing safe work habits will minimize hazards from the use of pesticides."
  };

  function paragraph(english, thai, role, vocabulary, analysis, pageList) {
    return { english, thai, role, vocabulary, analysis, pages: pageList };
  }

  function technicalParagraph(key, thai, role, vocabulary, analysis, pageList) {
    return paragraph(pesticideText[key], thai, role, vocabulary, analysis, pageList);
  }

  function section(id, pdf, from, to, title, summary, points, passages, examples = []) {
    return { id, pdf, pages: pages(from, to), title, summary, points, passages, examples };
  }

  function worked(id, pdf, pageList, title, prompt, task, steps, answer, note, references) {
    return {
      id, pdf, pages: pageList, title, prompt, task, steps, answer, note, references,
      practice: true, answerable: true, answerOrigin: "คำตอบตัวอย่างที่วิเคราะห์จากบทอ่าน"
    };
  }

  function quiz(id, pdf, pageList, title, prompt, choices, correctChoice, steps) {
    return { id, pdf, pages: pageList, title, prompt, choices, correctChoice, steps, answer: choices[correctChoice] };
  }

  const riskPassage = {
    id: "pesticide-risk-passage",
    pdf: pesticides,
    pages: [1, 2, 3, 4],
    title: "Potential Health Effects of Pesticides · Toxicity, exposure and label words",
    paragraphs: [
      technicalParagraph("intro",
        "ผู้เขียนเปิดด้วยข้อสังเกตว่าสารกำจัดศัตรูพืชอาจก่ออันตรายต่อคน สัตว์ สิ่งมีชีวิตอื่น และสิ่งแวดล้อม คนที่ใช้หรือสัมผัสเป็นประจำจึงเป็นกลุ่มผู้อ่านที่ต้องเข้าใจความเป็นพิษ ผลกระทบ และวิธีลดการสัมผัส",
        "หน้า 1 · เกริ่นประเด็นและขอบเขต",
        ["potentially hazardous = มีโอกาสเกิดอันตราย", "preventative measures = มาตรการป้องกัน"],
        "Because สื่อเหตุ และ Therefore นำผลหรือข้อสรุป คำว่า potentially และ potential ระบุความเป็นไปได้",
        [1]),
      technicalParagraph("hazard",
        "Hazard หรือ risk ในบทอ่านหมายถึงโอกาสเกิดการบาดเจ็บหรือระดับอันตรายภายใต้เงื่อนไขเฉพาะ ผู้เขียนให้ดูทั้งความเป็นพิษและปริมาณที่สัมผัส",
        "หน้า 1 · นิยามคำและเตรียมอ่านสูตร",
        ["degree of danger = ระดับอันตราย", "under a given set of conditions = ภายใต้เงื่อนไขที่กำหนด"],
        "or ใน Hazard, or risk กับ potential for injury, or the degree of danger ใช้ขยายคำศัพท์ คำว่า depends on เชื่อมผลกับสองปัจจัย",
        [1]),
      technicalParagraph("formula",
        "สูตรในหน้า 1 ทำให้เห็นแกนของบทอ่าน เมื่ออธิบายความเสี่ยงให้กล่าวถึงปัจจัยสองด้าน ได้แก่ ความเป็นพิษกับระดับการสัมผัส",
        "หน้า 1 · สูตรแสดงความสัมพันธ์",
        ["toxicity = ความเป็นพิษ", "exposure = การสัมผัส"],
        "เครื่องหมาย x เชื่อมสองปัจจัย สูตรนี้ช่วยอ่านเหตุผลหลักของผู้เขียน และบทสรุปจะย้อนกลับมาที่แนวเดียวกัน",
        [1]),
      technicalParagraph("toxicity",
        "ย่อหน้านี้ให้ความหมายของ toxicity ว่าคือความสามารถที่จะทำให้บาดเจ็บหรือเจ็บป่วย แล้วอธิบาย active ingredient ว่าเป็นส่วนที่ออกฤทธิ์ในผลิตภัณฑ์ การเลือกความเป็นพิษต่ำกว่าถูกยกเป็นตัวอย่างหนึ่งของการลดความเสี่ยง",
        "หน้า 1 · อธิบายปัจจัยด้านความเป็นพิษ",
        ["capacity = ความสามารถ", "active ingredient = สารออกฤทธิ์", "formulated product = ผลิตภัณฑ์ที่ผสมเป็นสูตรแล้ว"],
        "that controls the pest ขยาย chemical component ส่วน that will control the pest ขยายตัวเลือกที่ยังทำงานตามจุดประสงค์",
        [1]),
      technicalParagraph("applicators",
        "ผู้ใช้อาจควบคุมชนิดผลิตภัณฑ์ที่มีให้เลือกได้จำกัด ผู้เขียนจึงยกการปฏิบัติตามฉลาก การใช้อุปกรณ์ป้องกัน และการจัดการอย่างเหมาะสมมาอธิบายว่าสามารถลดการสัมผัส พร้อมใช้ตัวอย่างการสัมผัสทางผิวหนัง",
        "หน้า 1–2 · หันจากชนิดผลิตภัณฑ์ไปสู่ปัจจัยการสัมผัส",
        ["applicator = ผู้ใช้หรือผู้พ่นสาร", "minimize = ลดให้เหลือน้อย", "dermal exposure = การสัมผัสทางผิวหนัง"],
        "However เปลี่ยนจากสิ่งที่ควบคุมยากไปสู่สิ่งที่ผู้ใช้ทำได้ กลุ่ม following, using และ handling ต่อจาก by ที่ท้ายหน้า 1",
        [1, 2]),
      technicalParagraph("acute",
        "Acute toxicity คือความสามารถที่จะทำอันตรายจากการสัมผัสครั้งเดียวโดยทั่วไปมีระยะสั้น ผลที่เกิดเรียก acute effects บทอ่านแยกช่องทางได้แก่ ผิวหนัง การหายใจ การกลืน และดวงตา",
        "หน้า 2 · นิยาม acute",
        ["single exposure = การสัมผัสครั้งเดียว", "route of entry = ช่องทางเข้าสู่ร่างกาย", "eye and skin irritation = การระคายเคืองตาและผิวหนัง"],
        "generally of short duration ขยาย single exposure ส่วน termed บอกว่าผลกระทบดังกล่าวเรียกว่าอะไร",
        [2]),
      technicalParagraph("measure",
        "บทอ่านอธิบายตัวชี้วัด LD50 และ LC50 พร้อมหน่วยที่เกี่ยวข้อง และบอกว่าค่าที่ต่ำลงแปลว่าความเป็นพิษมากขึ้นในกรอบการเปรียบเทียบที่กล่าวถึง",
        "หน้า 2 · อธิบายการวัดและทิศทางการเปรียบเทียบ",
        ["dosage = ปริมาณที่ได้รับ", "toxicant = สารที่เป็นพิษ", "test population = กลุ่มที่ใช้ทดสอบ"],
        "โครงสร้าง The lower ..., the greater ... ให้เก็บทิศทางทั้งสองด้านเมื่อถอดความ คู่ดังกล่าวอยู่ในประโยคท้ายย่อหน้า",
        [2]),
      technicalParagraph("chronic",
        "Chronic effects คือผลที่สัมพันธ์กับการสัมผัสปริมาณเล็กซ้ำ ๆ เป็นเวลานาน ผู้เขียนยกผลที่สงสัยว่าเกี่ยวข้องหลายแบบ และระบุว่าประเมินด้วยการทดลองได้ยากกว่าแบบ acute",
        "หน้า 2–3 · ขยายจาก single exposure ไปสู่ repeated exposure",
        ["long-term exposure = การสัมผัสระยะยาว", "repeated over a period of time = เกิดซ้ำในช่วงเวลาหนึ่ง", "suspected = สงสัยว่าเกี่ยวข้อง"],
        "repeated over a period of time ขยาย small doses ระวังตัด suspected ออกในการสรุป เพราะจะทำให้น้ำหนักกลายเป็นยืนยันผล",
        [2, 3]),
      technicalParagraph("firstCategory",
        "หมวด Signal Words เปิดด้วยการจัดกลุ่มตามความเป็นพิษเฉียบพลัน บทอ่านอธิบายฉลากกลุ่ม Category I ด้วยคำ DANGER และ POISON สัญลักษณ์กะโหลกไขว้ และคำสเปน PELIGRO",
        "หน้า 3 · เริ่มรายการประเภทฉลาก",
        ["relative acute toxicity = ความเป็นพิษเฉียบพลันเชิงเปรียบเทียบ", "signal word = คำสัญญาณบนฉลาก", "skull and crossbones = หัวกะโหลกกับกระดูกไขว้"],
        "which are classified as highly toxic จำกัดกลุ่มที่จะกล่าวถึงในประโยค ถ้าโจทย์ให้เลือกคำบนฉลาก ให้รักษาเงื่อนไขของหมวดนั้น",
        [3]),
      technicalParagraph("dangerAlone",
        "ผู้เขียนแยก DANGER ที่ปรากฏเดี่ยวออกเป็นกรณีระบุความเสียหายรุนแรงต่อตาหรือการระคายผิวรุนแรง การเห็นคำนี้คำเดียวให้สังเกตคำอธิบายที่กำกับในบทอ่าน",
        "หน้า 3 · อธิบายกรณี DANGER เดี่ยว",
        ["severe = รุนแรง", "just the signal word = มีเฉพาะคำสัญญาณนั้น"],
        "which tells you ... ขยายกรณีที่มี just the signal word DANGER เป็นรายละเอียดบอกขอบเขตของคำ",
        [3]),
      technicalParagraph("secondCategory",
        "บทอ่านเชื่อม moderately toxic หรือ Category II กับ WARNING และ AVISO แล้วให้รายละเอียดค่า acute oral LD50 เป็นหลักฐานเฉพาะของย่อหน้านี้",
        "หน้า 3 · ยกหมวดความเป็นพิษปานกลาง",
        ["moderately = ปานกลาง", "equivalent = คำที่มีความหมายเทียบกัน"],
        "In this category ย้อนกลับไปที่ Category II เมื่อตอบเรื่องคำเตือนให้ชี้ WARNING กับ AVISO ในย่อหน้าเดียวกัน",
        [3]),
      technicalParagraph("otherCategories",
        "บทอ่านเชื่อม Category III และ IV กับ CAUTION และอธิบายระดับความเป็นพิษที่ต่ำกว่าในบริบทของตัวอย่างฉลาก",
        "หน้า 3 · ต่อรายการหมวดความเป็นพิษ",
        ["slightly = เล็กน้อย", "relatively = เมื่อเปรียบเทียบกัน", "are required to = ถูกกำหนดให้"],
        "either ... or ... เชื่อมสองคำอธิบายของกลุ่มเดียวกัน ส่วน CAUTION เป็นข้อมูลที่ตรงคำถามฉลาก",
        [3]),
      technicalParagraph("tableOne",
        "ข้อความเกริ่นว่าตาราง 1 จัดเทียบค่าตามช่องทางสัมผัสและคำเตือน ให้ตัวอย่าง dermal ที่ชี้ไปหมวดหนึ่ง และกล่าวถึงข้อยกเว้นเมื่อผลกัดกร่อนตาหรือผิวมีความสำคัญกว่า ภาพตารางจริงไม่ปรากฏใน PDF ชุดนี้",
        "หน้า 3–4 · ข้ออ้างถึงตารางและข้อยกเว้น",
        ["associated = ที่สัมพันธ์กับ", "corrosive = กัดกร่อน", "take priority = มีลำดับสำคัญก่อน"],
        "Keep in mind that เปิดข้อแม้ ย่อหน้าข้ามจาก active ท้ายหน้า 3 ไป ingredient ต้นหน้า 4",
        [3, 4]),
      technicalParagraph("msds",
        "ย่อหน้าปิดกลุ่มฉลากระบุว่า Material Safety Data Sheet หรือ MSDS เป็นแหล่งให้ค้นค่าความเป็นพิษ และกล่าวถึงฉลาก ผู้จำหน่าย ผู้ผลิต และข้อมูลออนไลน์",
        "หน้า 4 · เชื่อมไปยังแหล่งข้อมูล",
        ["data sheet = แผ่นข้อมูล", "retailer = ผู้ค้าปลีก"],
        "including เพิ่มตัวอย่างข้อมูลที่พบในเอกสาร ใจความของย่อหน้าคือแหล่งค้นข้อมูล",
        [4])
    ]
  };

  const symptomsPassage = {
    id: "pesticide-symptoms-passage",
    pdf: pesticides,
    pages: [4, 5, 6],
    title: "Potential Health Effects of Pesticides · Symptoms and medical attention",
    paragraphs: [
      technicalParagraph("symptomVariation",
        "อาการมีตั้งแต่เบาไปถึงรุนแรง และแปรตามชนิดสารกับความไวของแต่ละคน ผู้เขียนใช้ความแตกต่างนี้ชี้ความสำคัญของการสังเกตอาการทั่วไป",
        "หน้า 4 · บทนำของอาการและความแปรผัน",
        ["range from ... to ... = มีตั้งแต่…ถึง…", "sensitivity = ความไวต่อสิ่งกระตุ้น"],
        "จาก Different classes ... ไป Individuals also vary ผู้เขียนให้สองเหตุที่ลักษณะอาการอาจต่างกัน",
        [4]),
      technicalParagraph("topical",
        "Topical effects มักเกิดตรงบริเวณที่สัมผัสจากการระคายเคืองหรือปฏิกิริยาแพ้ ย่อหน้ายก dermatitis หรือผิวหนังอักเสบเป็นตัวอย่างที่รายงานบ่อย",
        "หน้า 4 · นิยามและยกตัวอย่างอาการเฉพาะที่",
        ["topical effect = ผลเฉพาะที่", "dermatitis = ผิวหนังอักเสบ", "blister = ตุ่มพอง"],
        "at the site of pesticide contact ระบุตำแหน่ง อาการผื่นและตุ่มพองใช้เป็น Supporting Details",
        [4]),
      technicalParagraph("irritation",
        "ย่อหน้าข้ามหน้าอธิบายอาการระคายเคืองจากการสัมผัสละอองหรือกลิ่นและอาการที่อาจลดลงเมื่อพ้นสิ่งระคาย ผู้เขียนทำความต่างให้เห็นกับปฏิกิริยาภูมิไวเกิน ซึ่งอาจมีอาการทางเดินหายใจรุนแรงขึ้น",
        "หน้า 4–5 · เปรียบลักษณะการระคายกับภูมิไวเกิน",
        ["wheeze = หายใจมีเสียงหวีด", "subside = ทุเลา", "hypersensitivity = ภูมิไวเกิน"],
        "However ตรงท้ายหน้า 4 เชื่อมข้ามหน้าไปยังความต่างที่อธิบายต่อในหน้า 5",
        [4, 5]),
      technicalParagraph("systemic",
        "Systemic effects เกิดหลังสารถูกดูดซึมและกระจาย อาการอาจเกิดห่างจากจุดสัมผัสเดิม ตัวอย่างในบทอ่านมีคลื่นไส้ อ่อนเพลีย ปวดหัว และอาการรุนแรงเมื่อการได้รับพิษหนักขึ้น",
        "หน้า 5 · เปรียบความหมาย systemic กับ topical",
        ["absorb = ดูดซึม", "throughout = ทั่ว", "systemic effect = ผลที่กระทบระบบในร่างกาย"],
        "as a result of ใช้ให้เหตุว่าอาการไกลจากจุดสัมผัสได้อย่างไร",
        [5]),
      technicalParagraph("medicalHelp",
        "หัวข้อ Seeking Medical Attention กล่าวถึงการสังเกตอาการที่อาจเกิดทันทีหรือเกิดช้ากว่า และกล่าวถึงการขอความช่วยเหลือกับหน่วยงานที่ยกมาในเอกสาร",
        "หน้า 5 · เปลี่ยนจากลักษณะอาการไปสู่สิ่งที่ผู้เขียนเสนอให้ทำ",
        ["be alert for = เฝ้าสังเกต", "delayed = เกิดช้ากว่าเดิม", "seek medical attention = ขอความช่วยเหลือทางการแพทย์"],
        "These ต้นประโยคอ้างถึง signs and symptoms ส่วน may และ could รักษาความเป็นไปได้ของเวลาที่เกิดอาการ",
        [5]),
      technicalParagraph("labelInfo",
        "ผู้เขียนยกตัวอย่างข้อมูลจากฉลากและ MSDS ที่บุคลากรทางการแพทย์ใช้ เช่น ชื่อสารออกฤทธิ์ เลขทะเบียน และช่องทางติดต่อผู้ผลิต พร้อมเงื่อนไขเกี่ยวกับภาชนะปนเปื้อน",
        "หน้า 5 · ยกประเภทข้อมูลให้ผู้อ่าน scan",
        ["contaminated = ปนเปื้อน", "registration number = เลขทะเบียน", "medical personnel = บุคลากรทางการแพทย์"],
        "If safe to do so และ If the Material Safety Data Sheet is available สร้างเงื่อนไขคนละจุด จึงอ่านดูประโยคก่อนดึงคำตอบ",
        [5]),
      technicalParagraph("container",
        "ย่อหน้าข้ามหน้าให้รายละเอียดของผู้เขียนสำหรับการนำภาชนะและฉลากไปประกอบการพบแพทย์ พร้อมเน้นป้องกันการรั่วไหลและแยกภาชนะออกจากพื้นที่ผู้โดยสาร",
        "หน้า 5–6 · รายละเอียดต่อเนื่องจากการขอความช่วยเหลือ",
        ["container = ภาชนะ", "tightly sealed = ปิดสนิท", "enclosed passenger section = บริเวณผู้โดยสารแบบปิด"],
        "to avoid และ in order to แสดงจุดประสงค์ อ่าน plastic bag ต้นหน้า 6 ต่อเนื่องจาก place into ท้ายหน้า 5",
        [5, 6])
    ]
  };

  const mechanismsPassage = {
    id: "pesticide-families-passage",
    pdf: pesticides,
    pages: [6, 7, 8],
    title: "Potential Health Effects of Pesticides · Chemical families and monitoring",
    paragraphs: [
      technicalParagraph("fungicide",
        "ผู้เขียนกล่าวถึงความเป็นพิษแบบ acute ของ fungicides แล้วแจกแจงผลระคายผิว ตา และคอ พร้อมยกกรณีธัญพืชที่ผ่านการเคลือบและการใช้สีช่วยบ่งชี้ เอกสารอ้างถึงตาราง 2 แต่ภาพตารางไม่อยู่ในไฟล์ที่ได้รับ",
        "หน้า 6 · จัดประเภทและยกตัวอย่าง Fungicides",
        ["fungicide = สารควบคุมเชื้อรา", "seed grain = เมล็ดสำหรับเพาะปลูก", "dye = สีย้อม"],
        "but เชื่อมภาพรวมความเป็นพิษกับข้อควรสังเกตเรื่องการระคายเคือง และ To prevent ... แสดงจุดประสงค์ของตัวอย่างที่ตามมา",
        [6]),
      technicalParagraph("insecticide",
        "ผู้เขียนเริ่มด้วยข้อมูลเหตุการณ์ที่กล่าวถึงสหรัฐฯ ยก organophosphate และ carbamate เป็นกลุ่มตัวอย่าง แล้วอธิบายผลของการยับยั้ง cholinesterase ต่อระบบประสาท",
        "หน้า 6 · จัดประเภท Insecticides และปูคำศัพท์",
        ["insecticide = สารกำจัดแมลง", "inhibit = ยับยั้ง", "disruption = การรบกวนการทำงาน"],
        "include นำรายชื่อตัวอย่างของแต่ละกลุ่ม ข้อสรุปเชิงกลไกอยู่หลังรายชื่อทั้งสอง",
        [6]),
      technicalParagraph("tableFour",
        "ข้อความหนึ่งประโยคชี้ไปตาราง 4 สำหรับอาการหลังการสัมผัส acute กับสารกำจัดแมลง ภาพตารางดังกล่าวไม่อยู่ใน PDF นี้",
        "หน้า 6 · อ้างข้ามไปตารางที่เอกสารกล่าวถึง",
        ["summarize = สรุป", "acute exposures = การสัมผัสแบบเฉียบพลันในบริบทนี้"],
        "อ่านหน้าที่ของประโยคนี้ว่าเป็นป้ายบอกแหล่งข้อมูล จึงแยกการอ้างถึงตารางกับข้อมูลที่ปรากฏบนหน้า",
        [6]),
      technicalParagraph("nervousSystem",
        "ผู้เขียนอธิบายเครือข่ายเซลล์ประสาทก่อนอธิบายผลของสาร สัญญาณไฟฟ้าเดินทางผ่านเครือข่าย และเซลล์มีช่องว่างที่สัญญาณต้องข้าม",
        "หน้า 6–7 · ปูพื้นกลไกด้วยคำอธิบาย Synapse",
        ["nerve impulse = สัญญาณประสาท", "neuron = เซลล์ประสาท", "synapse = บริเวณเชื่อมต่อสื่อสารของเซลล์ประสาท"],
        "To understand ... one needs to ... บอกความจำเป็นของพื้นความรู้ ส่วน rather เปิดข้อความแก้ภาพที่อาจจินตนาการผิด",
        [6, 7]),
      technicalParagraph("impulse",
        "acetylcholine ถูกปล่อยเพื่อส่งสัญญาณข้ามช่องว่างไปยังเซลล์ถัดไป หลังสัญญาณผ่านแล้ว cholinesterase จะสลายสารส่งสัญญาณเพื่อเตรียมรอบถัดไป",
        "หน้า 7 · ลำดับปกติของการส่งสัญญาณ",
        ["transmission = การส่งผ่าน", "break down = สลาย", "cleared = พร้อมรับรอบใหม่ในบริบทนี้"],
        "When, After และ Once เป็นตัวบอกลำดับ Passive is released กับ is broken down ให้ตามผู้กระทำที่ต้นฉบับระบุ",
        [7]),
      technicalParagraph("inhibit",
        "ในคำอธิบายของบทอ่าน การยับยั้ง cholinesterase ทำให้ acetylcholine สะสม ส่งผลให้สัญญาณประสาทไหลต่อเนื่องและควบคุมได้ยาก",
        "หน้า 7 · เชื่อมเหตุและผลจากกลไก",
        ["buildup = การสะสม", "uncontrolled flow = การไหลที่ควบคุมไม่ได้"],
        "resulting in และ results in เชื่อมขั้นเหตุผลไว้สองจุด ให้ถอดความเป็น ยับยั้ง → สะสม → ส่งสัญญาณต่อเนื่อง",
        [7]),
      technicalParagraph("combinedSymptoms",
        "ย่อหน้านี้เชื่อมกลไกกับคำเดิม topical และ systemic ยกกรณีสัมผัสตาโดยตรงเป็นตัวอย่างผลเฉพาะที่ และกล่าวถึงการสะสมของ acetylcholine ที่ปลายประสาทในผลแบบ systemic",
        "หน้า 7 · นำการจำแนกอาการเดิมมาใช้กับกลุ่มตัวอย่าง",
        ["constriction = การหดแคบ", "nerve ending = ปลายประสาท", "blurry = พร่ามัว"],
        "both ... and ... กำหนดว่าผู้เขียนครอบคลุมทั้งสองกลุ่ม ไม่ควรสรุปย่อหน้าให้เหลือกลุ่มเดียว",
        [7]),
      technicalParagraph("onset",
        "เวลาที่เริ่มแสดงอาการสัมพันธ์กับช่องทางเข้าสู่ร่างกายและความรุนแรง ผู้เขียนเปรียบตัวอย่างจากการกลืน การหายใจ และการดูดซึมทางผิวหนัง แล้วให้ข้อสังเกตสำหรับเด็กต่อในหน้า 8",
        "หน้า 7–8 · เปรียบช่องทางกับการเริ่มของอาการ",
        ["onset = การเริ่มเกิด", "ingested = ถูกกลืนเข้าสู่ร่างกาย", "inhaled = ถูกสูดหายใจเข้าไป"],
        "if the material has been ... เป็นเงื่อนไขซ้ำของแต่ละเส้นทาง การตอบ scanning ให้จับคู่ช่องทางกับอาการในประโยคเดียวกัน",
        [7, 8]),
      technicalParagraph("advanced",
        "ย่อหน้าสั้นนี้ยกตัวอย่างอาการรุนแรงเพิ่มเติม เช่น การเปลี่ยนแปลงของรูม่านตา อัตราการเต้นหัวใจ การอ่อนแรง และความสับสน",
        "หน้า 8 · ขยายผลเมื่ออาการรุนแรงขึ้น",
        ["advanced poisoning = ภาวะพิษขั้นรุนแรง", "pupil = รูม่านตา", "unresponsive = ไม่ตอบสนอง"],
        "Other symptoms include เปิดรายการแยกจากอาการชุดแรก ทำความเข้าใจว่าเป็นตัวอย่างของภาวะที่กล่าวในต้นย่อหน้า",
        [8]),
      technicalParagraph("baseline",
        "บทอ่านให้ความหมาย baseline ว่าเป็นค่าตั้งต้นของแต่ละคน เนื่องจากระดับ cholinesterase ต่างกันได้ ผู้เขียนยกช่วงเวลาและจำนวนการทดสอบเป็นรายละเอียดสนับสนุน",
        "หน้า 8 · อธิบายเหตุผลที่ต้องมี Baseline",
        ["baseline = ค่าตั้งต้นสำหรับเปรียบเทียบ", "periodic = เป็นช่วง ๆ", "genetically determined = มีพันธุกรรมเป็นตัวกำหนด"],
        "Since แสดงเหตุของการสร้าง baseline จับคู่ตัวเลขกับหน่วยและเงื่อนไขในข้อสอบที่ถามรายละเอียด",
        [8]),
      technicalParagraph("monitoring",
        "ผลการวัดซ้ำเทียบกับ baseline ให้บุคลากรทางการแพทย์สังเกตความเป็นไปได้ของการสัมผัสมากเกินไป ย่อหน้าจัดรายละเอียดเป็นลำดับทดสอบ เทียบ และยืนยัน",
        "หน้า 8 · อธิบายวัตถุประสงค์ของการติดตาม",
        ["monitoring = การติดตาม", "recognize = สังเกตหรือระบุได้", "confirm = ยืนยัน"],
        "The purpose of ... is to ... เป็นหลักฐานตรงสำหรับคำถามจุดประสงค์ ประโยค If อธิบายเงื่อนไขต่อจากนั้น",
        [8])
    ]
  };

  const preventionPassage = {
    id: "pesticide-prevention-passage",
    pdf: pesticides,
    pages: [9, 10],
    title: "Potential Health Effects of Pesticides · Prevention and conclusion",
    paragraphs: [
      technicalParagraph("prevention",
        "ส่วนป้องกันย้อนสูตรจากหน้า 1 และใช้ความเป็นพิษร่วมกับระดับสัมผัสอธิบายความเสี่ยง ผู้เขียนเน้นการใช้ PPE ตามฉลาก แล้วแบ่งรายละเอียดตามสี่ช่องทาง",
        "หน้า 9 · ย้ำแกนของบทอ่านและจัดหมวดถัดไป",
        ["regardless of = ไม่ว่า…จะเป็นอย่างไร", "PPE = อุปกรณ์ป้องกันส่วนบุคคล", "guidelines = แนวทาง"],
        "As mentioned earlier อ้างกลับไปนิยามก่อนหน้า สอง if ช่วยอ่านเปรียบเงื่อนไขระดับสัมผัส",
        [9]),
      technicalParagraph("dermal",
        "ผู้เขียนให้ตัวอย่างการสัมผัสผิวจากการกระเด็น การหก ละออง หรือดูแลเครื่องมือ แล้วลิสต์เสื้อผ้าป้องกันที่สัมพันธ์กับช่องทางนี้",
        "หน้า 9 · ตัวอย่างหมวดผิวหนัง",
        ["dermal absorption = การดูดซึมทางผิวหนัง", "splash = การกระเด็น", "coveralls = ชุดป้องกันคลุมตัว"],
        "คำว่า more than ใน More than 95 percent ระบุว่ามากกว่าค่าที่ให้ ในคำถามตัวเลขให้คงเครื่องหมายเปรียบเทียบไว้",
        [9]),
      technicalParagraph("inhalation",
        "ย่อหน้าเรื่องการหายใจเชื่อมระบบหายใจกับเส้นทางเข้าสู่ระบบไหลเวียน แล้วระบุรูปแบบของสิ่งที่สูดเข้าไปได้ เช่น ฝุ่น ไอ หรือหยดละออง",
        "หน้า 9 · ตัวอย่างหมวดสูดดม",
        ["inhalation = การสูดดม", "respiratory system = ระบบหายใจ", "circulatory system = ระบบไหลเวียนเลือด"],
        "especially important when บอกเงื่อนไขที่ผู้เขียนต้องการเน้น และ because อาจใช้เชื่อมเหตุอย่างตรงไปตรงมาเมื่อถอดความ",
        [9]),
      technicalParagraph("respirator",
        "ย่อหน้าสั้นต่อจาก Inhalation ระบุให้ใช้ respirator ตามวัตถุประสงค์กับคำแนะนำผู้ผลิต และยกชื่อหน่วยงานรับรองในเอกสาร",
        "หน้า 9 · ขยายรายละเอียดเครื่องป้องกันการหายใจ",
        ["respirator = อุปกรณ์ป้องกันทางเดินหายใจ", "intended use = การใช้ตามจุดประสงค์ที่ออกแบบ"],
        "as designed ขยายวิธีใช้ selected equipment ส่วน only จำกัดชนิดอุปกรณ์ตามที่ผู้เขียนกำหนด",
        [9]),
      technicalParagraph("oral",
        "ย่อหน้า Oral ให้สถานการณ์ตัวอย่างของการกลืนโดยไม่ตั้งใจ เช่น ย้ายสารไปขวดที่ไร้ฉลาก แล้วอธิบายแนวทางจัดเก็บกับสุขอนามัยตามบทอ่าน",
        "หน้า 10 · ตัวอย่างหมวดการกลืน",
        ["unlabeled = ไร้ฉลาก", "accidental = โดยไม่ตั้งใจ", "out of the reach of = พ้นมือหรือการเอื้อมถึง"],
        "คำว่า most frequently occurs when เชื่อมเหตุการณ์กับเงื่อนไขที่ตามมา ประโยคเรื่องภาชนะเดิมปรากฏซ้ำในต้นฉบับ",
        [10]),
      technicalParagraph("eyes",
        "หัวข้อ Eyes บอกความไวของตาและยกสาเหตุการสัมผัส เช่น ละอองหรือขยี้ตาด้วยมือปนเปื้อน จากนั้นระบุอุปกรณ์และวิธีหลีกเลี่ยงการกระเด็นตามที่เอกสารกล่าว",
        "หน้า 10 · ตัวอย่างหมวดดวงตา",
        ["goggles = แว่นครอบตา", "shield = ฉากหรือชิ้นส่วนป้องกัน", "eye level = ระดับสายตา"],
        "can result from นำตัวอย่างเหตุที่ตามมา บทอ่านใช้ if และ especially when เพื่อจำกัดบริบทการป้องกัน",
        [10]),
      technicalParagraph("summary",
        "บทสรุปย้อนภาพรวมว่าการใช้ไม่ถูกวิธีอาจก่ออันตราย ผู้เขียนสรุปแนวคิดลดการสัมผัสโดยอุปกรณ์ป้องกัน อ่านฉลาก รักษาพฤติกรรมการทำงานที่ปลอดภัย และเลือกความเป็นพิษต่ำเมื่อทำได้",
        "หน้า 10 · สังเคราะห์แกนและปิดด้วยข้อแนะนำ",
        ["if used incorrectly = หากใช้อย่างไม่ถูกวิธี", "minimize hazards = ลดความเสี่ยงให้เหลือน้อย"],
        "The key to ... is ... ชี้ประโยคสรุปแกน และ when available เป็นเงื่อนไขของทางเลือกที่ผู้เขียนเสนอ",
        [10])
    ]
  };

  const seaPassage = {
    id: "sea-reading-passage",
    pdf: swimming,
    pages: [1, 2],
    title: "Turns Out Swimming in the Sea Is Actually Kind of Bad for You",
    paragraphs: [
      paragraph("Stomach bugs, earaches, and more await you in the ocean.\n\nDunking around in the sea can feel like a rebirth: you emerge virtuous, salty, and oblivious to your existential angst for five beautiful minutes at least.",
        "คำโปรยเกริ่นอาการอย่างปัญหาท้องและปวดหู ส่วนย่อหน้าเปิดใช้ภาพความรู้สึกดีหลังลงทะเล เหมือนเริ่มต้นใหม่ชั่วคราวและลืมความกังวล เป็นการเล่าเชิงอารมณ์เพื่อดึงผู้อ่าน",
        "หน้า 1 · คำโปรยใต้พาดหัวและย่อหน้า 1 ที่เป็น Hook",
        ["dunk = จุ่มตัวลงในน้ำ", "rebirth = การเกิดใหม่", "oblivious to = ไม่ทันตระหนักถึง"],
        "can feel like แสดงการเปรียบความรู้สึก ส่วน colon ในต้นฉบับเปิดรายละเอียดของอุปมานั้น",
        [1]),
      paragraph("But people who swim, \"bathe\" or play water sports in the sea are substantially more likely to get stomach bugs, ear aches and other infections than those who don't, according to a large-scale research analysis by the University of Exeter Medical School.",
        "ผู้เขียนเปลี่ยนจากความรู้สึกไปสู่ผลวิเคราะห์จาก University of Exeter Medical School โดยรายงานว่าคนเล่นน้ำทะเลมีโอกาสพบปัญหาทางท้อง หู หรือการติดเชื้อสูงกว่ากลุ่มที่ไม่ได้ลง",
        "หน้า 1 · ย่อหน้า 2 · Main Claim และแหล่งข้อมูล",
        ["substantially = อย่างมีนัยสำคัญในภาษาทั่วไปหรือมากพอสมควร", "more likely = มีแนวโน้มมากกว่า", "according to = อ้างตาม"],
        "who swim ... ขยาย people ส่วน those who don't ย้อนกลับไปยังคนที่ไม่ได้ทำกิจกรรมในทะเล",
        [1]),
      paragraph("The analysis found that swimming in the sea doubled the odds of reporting \"general ear ailments\", with the odds of reporting an earache specifically rising by 77 percent. For gastrointestinal illnesses, the odds increased by 29 percent. Not putting your head under makes no difference, either.",
        "ให้หลักฐานเชิงตัวเลขแบบ odds ได้แก่ อาการเกี่ยวกับหูโดยรวมเพิ่มเป็นสองเท่า อาการปวดหูเฉพาะเพิ่ม 77% และโรคระบบทางเดินอาหารเพิ่ม 29% บทอ่านยังบอกว่าการที่ศีรษะไม่จมน้ำไม่ทำให้ผลต่างไป",
        "หน้า 1 · ย่อหน้า 3 · ข้อมูลที่ตรวจด้วย Scanning",
        ["ailment = อาการเจ็บป่วย", "odds = อัตราส่วนโอกาสเกิดเทียบไม่เกิด", "gastrointestinal = เกี่ยวกับทางเดินอาหาร"],
        "ตัวเลขสามประเภทมีหน่วยเทียบและชื่ออาการต่างกัน รักษาคำว่า odds increased by และจับคู่คำนามที่ตามมาให้ถูก",
        [1]),
      paragraph("Going by strict inclusion criteria such as scale, researchers drew data from 19 out of a potential 6,919 studies. The studies looked at the links between sea bathing and the incidence of illness in countries including Australia, New Zealand, the US, Denmark, and Norway.",
        "เล่าวิธีเลือกงานศึกษา นักวิจัยใช้เกณฑ์คัดเข้มงวดและเลือก 19 จาก 6,919 งาน งานที่นำมาเทียบดูความเชื่อมโยงของการเล่นน้ำทะเลกับการเจ็บป่วยในหลายประเทศ",
        "หน้า 2 · ย่อหน้า 4 · วิธีคัดเลือกหลักฐาน",
        ["inclusion criteria = เกณฑ์คัดเข้า", "drew data from = ดึงข้อมูลจาก", "incidence = การเกิดหรืออุบัติการณ์"],
        "19 out of a potential 6,919 ใช้ 19 เป็นชุดที่นำมาวิเคราะห์ และใช้ 6,919 เป็นจำนวนที่อาจเข้าข่ายก่อนคัดเลือก",
        [2]),
      paragraph("Australia's coasts are subject to rubbish, sewage, industrial waste, storm water and dredging. According to a 2013 study, each square kilometre of our sea surface is contaminated by around 4,000 pieces of \"tiny plastics\", which are all \"loaded with pollutants\".",
        "ให้บริบทชายฝั่งออสเตรเลียที่สัมผัสขยะ น้ำเสีย ของเสียอุตสาหกรรม น้ำฝนไหลบ่า และการขุดลอก แล้วอ้างงานปี 2013 ประมาณชิ้นพลาสติกขนาดเล็กต่อตารางกิโลเมตร",
        "หน้า 2 · ย่อหน้า 5 · ตัวอย่างบริบทมลพิษ",
        ["subject to = อยู่ภายใต้หรือได้รับผลจาก", "dredging = การขุดลอก", "pollutant = สารปนเปื้อน"],
        "which อ้างกลับ tiny plastics และ around แสดงค่าประมาณ คงหน่วย pieces per square kilometre ถ้าโจทย์ถามตัวเลข",
        [2]),
      paragraph("People tend to assume developed nations have cleaner seas, writes Dr Anne Leonard of the University of Exeter Medical School. However, \"We think this [data analysis] indicates that pollution is still an issue affecting swimmers in some of the world's richest countries.\"",
        "Dr Anne Leonard ยกข้อสมมติที่คนมักเชื่อว่าทะเลประเทศพัฒนาแล้วสะอาดกว่า แล้วชี้ว่าผลวิเคราะห์บ่งชี้ปัญหามลพิษในประเทศร่ำรวยบางแห่งยังมีอยู่",
        "หน้า 2 · ย่อหน้า 6 · ตั้งข้อสังเกตสวนความคาดหมาย",
        ["assume = สมมติหรือเชื่อไว้ก่อน", "indicate = บ่งชี้", "still = ยัง"],
        "However เปลี่ยนจากข้อสมมติทั่วไปไปเสียงนักวิจัยที่มีข้อจำกัดคือ some of และ We think",
        [2]),
      paragraph("Dr Will Gaze, who supervised the research, said: “We don’t want to deter people from going into the sea, which has many health benefits … However, it is important that people are aware of the risks so they can make informed decisions.”",
        "Dr Will Gaze กล่าวถึงประโยชน์ของการลงทะเลและขอให้คนรู้ความเสี่ยงเพื่อประกอบการตัดสินใจ โดยให้มองทั้งสองด้านพร้อมกัน",
        "หน้า 2 · ย่อหน้า 7 · มุมมองผู้วิจัยและคำแนะนำ",
        ["deter = ทำให้คนเลี่ยงหรือเลิกคิดจะทำ", "be aware of = ตระหนักถึง", "informed decision = การตัดสินใจโดยมีข้อมูล"],
        "who supervised the research ขยาย Dr Will Gaze ส่วน so they can ... บอกจุดประสงค์ของการรู้ความเสี่ยง",
        [2]),
      paragraph("Most people will recover from infections without medical treatment, Gaze added, but they can be more dangerous when contracted by vulnerable people like the very old or young, or people with pre-existing health conditions. \"We have come a long way in terms of cleaning up our waters, but our evidence shows there is still work to be done,\" he said.",
        "ปิดด้วยข้อจำกัดและกลุ่มเปราะบาง Gaze กล่าวว่าโดยมากคนฟื้นตัวได้ แต่การติดเชื้ออาจรุนแรงขึ้นในคนบางกลุ่ม และยังมีงานด้านคุณภาพน้ำที่ต้องทำต่อ",
        "หน้า 2 · ย่อหน้า 8 · ให้บริบทข้อจำกัดและปิดเรื่อง",
        ["vulnerable = เปราะบาง", "pre-existing = มีมาก่อน", "come a long way = พัฒนามาไกลแล้ว"],
        "ใน they can be more dangerous คำว่า they ชี้ถึง infections ที่คนกลุ่มนี้อาจได้รับ ส่วน but ตอนท้ายวางความคืบหน้าคู่กับงานที่ยังเหลือ",
        [2])
    ]
  };

  window.ReadingSkills.addChapter({
    number: 12,
    title: "Reading Practice: Pesticides and Swimming in the Sea",
    thaiTitle: "ฝึกอ่านบทความสุขภาพสองแบบ จับใจความและชี้หลักฐานจากข้อความภาษาอังกฤษ",
    summary: "อ่านบทความอธิบายเรื่องสารกำจัดศัตรูพืชและบทความรายงานผลวิจัยเรื่องการลงทะเล ฝึก Skimming, Scanning, แยกข้อกล่าวอ้างออกจากหลักฐาน และเขียนสรุปโดยคงเงื่อนไขกับน้ำหนักของต้นฉบับ",
    goals: [
      "กวาดหัวเรื่อง หัวข้อย่อย และประโยคเปิดท้ายเพื่อบอกว่าแต่ละบทความมีจุดประสงค์อะไร",
      "จับคู่ตัวเลขกับหน่วย กลุ่มเปรียบเทียบ และคำที่จำกัดขอบเขต เช่น odds, substantially, may และ some",
      "เขียน Outline กับ Short Summary ที่ชี้ว่าข้อมูลส่วนใดเป็นคำกล่าวของผู้เขียนหรือแหล่งวิจัย และระบุข้อที่อนุมานเองจากย่อหน้า"
    ],
    confusions: [
      "Hazard ใช้ในความหมายความเสี่ยงตามเงื่อนไข ขณะที่ Toxicity เป็นคุณสมบัติก่ออันตรายที่ผู้เขียนนำมาเป็นหนึ่งปัจจัยในสูตร",
      "จำนวนงานที่ผ่านเกณฑ์ จำนวนตั้งต้น และค่าการเพิ่ม odds ตอบคนละคำถาม ให้ดูคำข้างตัวเลขเสมอ",
      "หัวเรื่องและภาพช่วย Skim น้ำเสียง ส่วนข้อความผลวิเคราะห์และคำพูดที่อ้างชื่อเป็นจุดให้ Scan หลักฐาน"
    ],
    sections: [
      section("pesticide-risk", pesticides, 1, 4, "Potential Health Effects of Pesticides · Define the problem",
        "Skim ชื่อเรื่องแล้วดูหัวข้อ Toxicity and Exposure, Acute, Chronic และ Signal Words ลำดับนี้เผยว่าผู้เขียนวางนิยามก่อนอธิบายการจำแนก จึงเลือกกลับมาอ่านย่อหน้าที่ตอบคำถามแต่ละแบบได้ทันที",
        [
          ["แนวบทความ", "ภาษาให้ข้อมูลและอธิบายกลไก เห็นจากการนิยาม สูตร หัวข้อย่อย และการระบุเงื่อนไข ย่อหน้าเปิดบอกผู้อ่านเป้าหมายว่าเป็นคนที่ใช้หรือสัมผัสสารเป็นประจำ"],
          ["Acute / Chronic", "หน้า 2–3 จับคู่ single exposure กับ acute และ repeated over a period of time กับ chronic"],
          ["Signal Words", "หน้า 3 แยก DANGER + POISON / WARNING / CAUTION ตามที่บทอ่านกล่าว และยกกรณี DANGER เดี่ยวมาขยาย"],
          ["ข้อความอ้างตาราง", "หน้า 3–4 กล่าวถึง Table 1 และยกตัวอย่างในเนื้อความ เอกสาร 10 หน้าที่ได้รับไม่มีตัวตารางสำหรับตรวจค่าทั้งชุด"]
        ],
        [riskPassage], [
          worked("risk-thesis-guide", pesticides, [1, 2, 9, 10], "หาความคิดหลักจากประโยคเปิดกับสูตรที่กลับมาซ้ำ",
            "What does the article identify as the main factors that shape pesticide hazard?",
            "หา Thesis ที่โยงนิยามกับข้อสรุปและตอบด้วยหลักฐานที่ระบุจริง",
            [
              "หลังย่อหน้าเปิด หน้า 1 ให้โครง “Hazard = Toxicity x Exposure” โดยนิยามทั้งสองปัจจัยในย่อหน้าที่ตามมา",
              "หน้า 9 ขึ้นต้น “As mentioned earlier” แล้วให้สูตรเดิมอีกครั้ง จึงเป็นแกนเนื้อหาที่ผู้เขียนย้ำ",
              "หน้า 10 สรุปว่าควรลดการสัมผัสและใช้ชนิดความเป็นพิษต่ำเมื่อทำได้ ทำให้เห็นผลของปัจจัยทั้งสอง"
            ], "Pesticide hazard depends on both the product’s toxicity and the amount of exposure.", "โจทย์ฝึกเพิ่ม · คำตอบระบุตรงในหน้า 1 และ 9",
            [["ฝึกโจทย์ต้นฉบับของบทอ่านนี้ใน Lecture 8", "#itlg201/lecture-08/pesticides-article"]]),
          worked("acute-chronic-guide", pesticides, [2, 3], "เทียบ Acute กับ Chronic โดยอ่านตัวบอกเวลา",
            "What is the difference between acute and chronic effects in the passage?",
            "Scan หาคู่คำที่อธิบายเวลาหรือความถี่ของการสัมผัส",
            [
              "ใต้ Acute ให้ขีด “single exposure” และ “generally of short duration”",
              "ใต้ Chronic ให้ขีด “small doses repeated over a period of time”",
              "เขียนเทียบสองเงื่อนไขและรักษาคำว่า generally เมื่อเล่าช่วงเวลาของ acute"
            ], "Acute effects follow a single exposure, usually short. Chronic effects arise from repeated exposures over time.", "โจทย์ฝึกเพิ่ม · หลักฐานตรงในหน้า 2")
        ]),
      section("pesticide-symptoms", pesticides, 4, 6, "Symptoms and Seeking Medical Attention",
        "การอ่านคำถามเรื่องอาการเริ่มจากจับกลุ่ม topical กับ systemic แล้วตามอ่านตัวอย่างในย่อหน้าของกลุ่มนั้น ส่วน Seeking Medical Attention มีภาษาที่แสดงเงื่อนไขและการกระทำ จึงใช้ if, when และ should เป็นจุดช่วย Scanning",
        [
          ["Topical", "ชี้กลับไปที่ at the site of pesticide contact ในหน้า 4"],
          ["Systemic", "ชี้กลับไปที่ away from the original point of contact และ distributed throughout the body ในหน้า 5"],
          ["ย่อหน้าข้ามหน้า", "ประโยคตัวอย่างการระคายเคืองข้ามจากท้ายหน้า 4 ไปต้นหน้า 5 ส่วนข้อความภาชนะไปต่อจากหน้า 5 ถึง 6"]
        ], [symptomsPassage], [
          worked("topical-systemic-guide", pesticides, [4, 5], "แยกผลเฉพาะที่กับผลเมื่อสารถูกดูดซึม",
            "A reader underlines “at the site of pesticide contact” and “distributed throughout the body.” What do these phrases contrast?",
            "อธิบายความหมาย topical กับ systemic โดยใช้ตำแหน่งที่เกิดผลและเหตุเชื่อม",
            [
              "หน้า 4 เริ่มนิยาม topical ด้วย at the site of ... ยก dermatitis เป็น Supporting Detail",
              "หน้า 5 เริ่ม systemic ว่า away from the original point of contact เพราะตัวสารกระจายภายในร่างกาย",
              "จากสองวลีสรุปความต่างเชิงขอบเขตโดยไม่ข้ามไปเหมาว่าคนทุกคนต้องแสดงอาการชุดเดียว"
            ], "Topical effects develop at the contact site. Systemic effects can occur away from it because absorbed chemicals circulate through the body.", "โจทย์ฝึกเพิ่ม · มีหลักฐานตรงทั้งสองหน้า")
        ]),
      section("pesticide-families", pesticides, 6, 8, "Fungicides, Insecticides and Cholinesterase Testing",
        "สังเกตการจัดหมวด Fungicides, Insecticides และ Cholinesterase Testing สองหมวดแรกให้รายละเอียดของสารแต่ละกลุ่ม ส่วนการวัดเริ่มด้วย baseline และการเปรียบเทียบภายหลัง",
        [
          ["สัญญาณลำดับ", "หน้า 7 ใช้ When, After และ Once เชื่อมการส่งสัญญาณปกติ แล้วจึงใช้ resulting in อธิบายผลเมื่อขั้นตอนเปลี่ยน"],
          ["Baseline", "หน้า 8 ใช้ Since ... บอกเหตุที่ต้องมีค่าของแต่ละบุคคล"],
          ["Table 2 และ Table 4", "หน้า 6 กล่าวถึงตารางสัญญาณและอาการ โดยไฟล์ที่ได้รับมีคำอ้างถึงและตัวอย่างบางส่วนในเนื้อความ"]
        ], [mechanismsPassage], [
          worked("read-technical-sequence", pesticides, [6, 7], "อ่านย่อหน้ากลไกจากคำเชื่อมลำดับ",
            "Which sequence does the article describe for the normal transmission of a nerve impulse?",
            "เรียงเฉพาะเหตุการณ์ปกติที่บทอ่านระบุด้วย When, After และ Once",
            [
              "When an impulse reaches the synapse เปิดการปล่อย acetylcholine เพื่อส่งข้อความ",
              "After the impulse is transmitted ระบุลำดับถัดไปคือเอนไซม์ทำให้ acetylcholine สลาย",
              "Once this occurs นำผลว่าบริเวณ synapse พร้อมรับสัญญาณรอบใหม่"
            ], "Arrival of the impulse → release of acetylcholine and transfer of the message → breakdown of acetylcholine → readiness for the next signal.", "โจทย์ฝึกเพิ่ม · หลักฐานจากย่อหน้าที่ขึ้นด้วย When an impulse reaches"),
          worked("baseline-purpose-guide", pesticides, [8], "หา Purpose ของการติดตาม",
            "Why does the author say an individual baseline is necessary?",
            "แปลเส้นเหตุผลที่ขึ้นด้วย Since โดยระบุผลของการเปรียบเทียบในย่อหน้าถัดไป",
            [
              "หา “levels can vary considerably among individuals” เป็นเหตุผล",
              "ย่อหน้าถัดไปอธิบายว่าผลวัดใหม่ compared with the baseline level ช่วยสังเกตการสัมผัสมากเกินไป",
              "แปล baseline เป็นค่าตั้งต้นเฉพาะบุคคลเพื่อรักษาบทบาทของตัวเปรียบเทียบ"
            ], "Levels vary across people, so each person needs a starting value against which later results can be compared.", "โจทย์ฝึกเพิ่ม · ข้อสรุปมาจากสองย่อหน้าติดกัน")
        ]),
      section("pesticide-prevention", pesticides, 9, 10, "Exposure, Preventative Measures and Summary",
        "หน้า 9 ย้อนสูตรเรื่อง Hazard แล้วแบ่งรายละเอียดตามช่องทางสัมผัส ผู้อ่านสามารถกวาดหัวข้อ Dermal, Inhalation, Oral และ Eyes แล้วค่อยเลือกอ่านประโยคตัวอย่างในหมวดที่คำถามต้องการ",
        [
          ["ข้อสนับสนุน", "ย่อหน้าตามช่องทางเป็นรายละเอียดรองรับเป้าหมายลดการสัมผัส คงใจความนี้ถ้าต้องเขียน Short Summary"],
          ["ท่าทีท้ายเรื่อง", "Summary หน้า 10 ใช้ข้อความเชิงแนะนำเกี่ยวกับการลดการสัมผัส การอ่านฉลาก และการปฏิบัติงานอย่างปลอดภัย"]
        ], [preventionPassage], [
          worked("pesticide-short-summary", pesticides, [1, 2, 4, 5, 9, 10], "สรุปบทอ่านแบบเชื่อมต้นกับท้าย",
            "Write a short summary of the pesticide article and identify one sentence expressing the author’s final advice.",
            "เขียนภาพรวมจากสูตร รายละเอียดสองหรือสามแกน และข้อแนะนำในท้ายเรื่อง",
            [
              "หน้า 1 เกริ่นกลุ่มผู้ได้รับผลและระบุทั้ง toxicity กับ exposure",
              "เลือกแกน Acute/Chronic หน้า 2, Topical/Systemic หน้า 4–5 และ Prevention แบ่งตามช่องทางหน้า 9–10",
              "ใช้ “Reading the label and practicing safe work habits” เป็นหลักฐานของ Final Comment และรายงานโดยให้เป็นเสียงของผู้เขียน"
            ], "The article explains that pesticide risk depends on both toxicity and exposure. It distinguishes short-term and long-term exposure and explains why effects may occur at the contact site or elsewhere in the body. It concludes by encouraging readers to reduce exposure through protective measures and labeled instructions.", "โจทย์ฝึกเพิ่ม · ข้อความสรุปภาษาอังกฤษที่เรียบเรียงใหม่")
        ]),
      section("sea-research", swimming, 1, 2, "Swimming in the Sea · Read a report on research",
        "เริ่มจากชื่อเรื่องสนทนาและคำโปรยเรื่องอาการ แล้วอ่าน But ในย่อหน้า 2 เพื่อหา Main Claim ตัวเลข รายละเอียดงานวิจัย และคำพูดของนักวิจัยเป็นหลักฐานที่ผู้เขียนค่อย ๆ เพิ่มมาทีละส่วน",
        [
          ["พาดหัวและภาพ", "หน้า 1 มีพาดหัวที่ใช้ Turns Out กับ Kind of ภาษาชวนคุย คำโปรยชี้ประเภทอาการ และภาพชายหาดช่วยวางบริบท"],
          ["โครงการรายงาน", "Hook → ข้ออ้างอิงงานวิจัย → ตัวเลข → เกณฑ์คัดศึกษาและบริบทมลพิษ → คำพูดที่ถ่วงดุลเรื่องประโยชน์และความเสี่ยง"],
          ["Odds", "หน้า 1 แยก general ear ailments, earache specifically และ gastrointestinal illnesses คำว่า odds แสดงอัตราส่วนโอกาสเกิดเทียบไม่เกิด ส่วนตัวเลขการเพิ่มเป็นข้อมูลเชิงเปรียบเทียบ"],
          ["งานที่คัดเข้า", "หน้า 2 ใช้ 19 out of a potential 6,919 studies ตัวเลขแรกคือจำนวนงานที่ใช้และตัวเลขหลังคือจำนวนงานที่พบก่อนคัด"]
        ], [seaPassage], [
          worked("sea-scan-numbers", swimming, [1, 2], "จับคู่ตัวเลขกับคำนามและตัวเปรียบเทียบ",
            "What changed for general ear ailments, earache specifically, and gastrointestinal illnesses? How many studies did researchers include?",
            "Scan ตัวเลขแล้วอ่านคำข้างหน้าและข้างหลัง เพื่อจับคู่ข้อมูลให้ครบ",
            [
              "หน้า 1 ย่อหน้า 3 ผูกคำว่า doubled กับ “general ear ailments”",
              "77 percent อยู่กับ specifically earache และ 29 percent อยู่หลัง For gastrointestinal illnesses",
              "หน้า 2 “19 out of a potential 6,919 studies” ให้ 19 เป็นจำนวนคัดเข้า และ 6,919 เป็นจำนวนก่อนคัด",
              "เขียนคำตอบด้วย odds ตามต้นฉบับ เพราะเป็นการเปลี่ยนแปลงเชิงเปรียบเทียบ"
            ], "The odds of general ear ailments doubled, earache odds rose by 77%, and gastrointestinal illness odds rose by 29%. The researchers included 19 of 6,919 potentially relevant studies.", "โจทย์ฝึกเพิ่ม · หลักฐานตรงในสองหน้า"),
          worked("sea-purpose", swimming, [1, 2], "ดูท่าทีจากคำพูดของคนที่ถูกอ้าง",
            "What does the quoted researcher want readers to do with this information?",
            "อ่านคำกล่าวของ Dr Will Gaze ตอนท้าย แล้วบอกว่าผู้เขียนใช้คำกล่าวนี้ทำหน้าที่อะไร",
            [
              "มอง “We don’t want to deter people” และ “has many health benefits” เพื่อบอกบริบทข้อดี",
              "ตาม However ไปที่ “aware of the risks” และ “make informed decisions” เป็นคำแนะนำที่ระบุตรง",
              "เมื่อสรุปบทความ ให้เขียนว่ารายงานทั้งความเสี่ยงที่เพิ่มและเจตนาให้ผู้อ่านตัดสินใจโดยมีข้อมูล"
            ], "He wants readers to understand the risks and make informed choices while recognizing that going into the sea can have benefits.", "โจทย์ฝึกเพิ่ม · คำตอบตรงจากคำพูดที่ปรากฏในหน้า 2",
            [["ฝึกจัดประเภทบทความนี้ใน Lecture 8", "#itlg201/lecture-08/five-article-activity"]]),
          worked("sea-short-summary", swimming, [1, 2], "ร่าง Outline แล้วเขียน Short Summary",
            "Build an outline and write a short English summary preserving the reported findings, study selection, and advice.",
            "ใช้ชื่อเรื่องและ Thesis ในช่องเปิด เก็บผลวิจัยกับบริบทใน Body และปิดด้วยข้อสังเกตหรือคำแนะนำที่ยืนยันได้",
            [
              "หน้า 1 ระบุแหล่งวิเคราะห์ University of Exeter Medical School บทความที่เห็นไม่มี byline ของผู้เขียนบทความให้ระบุ ผู้ให้สัมภาษณ์เป็นแหล่งคำพูด",
              "Main claim คือ odds สูงขึ้นตามการรายงาน ใช้คำว่า analysis linked ... with เพื่อรักษาลักษณะหลักฐาน และเลือกข้อมูล 19 จาก 6,919 เพื่อแสดงการคัด",
              "เก็บมลพิษในหลายแหล่งและคำกล่าวว่าพบความเสี่ยงในประเทศร่ำรวยบางแห่ง คำว่า some จำกัดขอบเขต",
              "จบด้วยคำแนะนำให้ตัดสินใจอย่างมีข้อมูลและข้อสังเกตว่ายังมีงานด้านคุณภาพน้ำ"
            ], "The article “Turns Out Swimming in the Sea Is Actually Kind of Bad for You” reports that an analysis from the University of Exeter Medical School linked sea bathing with higher odds of ear and gastrointestinal illnesses. The researchers selected 19 studies using strict criteria, and the findings suggest that pollution may still affect swimmers in some wealthy countries. Although the article notes that swimming has benefits and most people recover from infections, some groups are more vulnerable. The researchers encourage people to consider the risks when making decisions and point out that further work is needed to improve water quality.", "โจทย์ฝึกเพิ่ม · ตัวอย่าง Summary 101 คำเมื่อนับแยกตามช่องว่าง")
        ])
    ],
    exercises: [
      quiz("q1", pesticides, [1, 2, 9], "Scan for the exact relationship",
        "Passage: The risk of a fall depends on both the slipperiness of a surface and how often people walk across it. Which statement preserves the relationship?",
        [
          "Only the material of the surface affects the risk.",
          "Frequent use always makes a surface slippery.",
          "Both surface slipperiness and walking frequency influence fall risk.",
          "The passage estimates how many people have already fallen."
        ], 2, [
          "หลักฐานคำว่า both ... and ... ระบุสองปัจจัย เหมือนคำอธิบาย relationship ในบทอ่านหน้า 1",
          "ข้อ ก ตัดความถี่การเดิน ข้อ ข เปลี่ยนความถี่เป็นเหตุให้พื้นลื่นและเติม always",
          "ข้อ ง เพิ่มสถิติจำนวนคนล้มซึ่งข้อความไม่ได้ให้"
        ]),
      quiz("q2", swimming, [1, 2], "Keep odds separate from absolute counts",
        "A report says the odds of a mild headache were 25% higher in group A than in group B. What does this statement tell us?",
        [
          "Exactly 25% of group A had a headache.",
          "The odds of a headache were higher in group A compared with group B.",
          "Twenty-five more people in group A had a headache.",
          "Everybody in group B avoided headaches."
        ], 1, [
          "หลักฐาน 25% higher in A than in B เป็นการเปรียบเทียบ odds ระหว่างกลุ่ม ลักษณะเดียวกับหน้า 1 ของบทอ่านลงทะเล",
          "ข้อ ก ใช้เป็นสัดส่วนคนในกลุ่ม ข้อ ค ใช้เป็นจำนวนคนเพิ่มแบบสัมบูรณ์",
          "ข้อ ง สรุปผลทุกคนในกลุ่ม B ซึ่งเกินข้อมูล"
        ]),
      quiz("q3", pesticides, [4, 5], "Use direct evidence from a definition",
        "Passage: Local reactions usually appear where the material touches the skin. General effects may appear elsewhere after the material spreads through the body. Which detail illustrates a local reaction?",
        [
          "Redness on the exact patch of skin touched by the material.",
          "A whole-body reaction after the material spreads.",
          "An effect at a distant site unrelated to the point of contact.",
          "A change across the whole body caused by circulation."
        ], 0, [
          "หลักฐาน where the material touches the skin เหมือนการชี้ตำแหน่งของ topical ในหน้า 4 จึงเลือกจุดที่สัมผัสโดยตรง",
          "ข้อ ข และ ง สื่อผลทั่วร่างกาย ส่วนข้อ ค อยู่ห่างจากจุดสัมผัส จึงเข้ากับ general effects ในโจทย์"
        ]),
      quiz("q4", swimming, [1, 2], "Infer the writer’s purpose",
        "Passage: A study linked access to public parks with increased activity. The reporter describes the results and quotes a researcher who notes that safe sidewalks matter too. What is the likely purpose?",
        [
          "To instruct readers to design a sidewalk.",
          "To advertise a particular brand of outdoor equipment.",
          "To argue that parks are the only influence on activity.",
          "To report a finding and give relevant context from a researcher."
        ], 3, [
          "ผู้รายงาน describes the results และ quotes a researcher ลักษณะนี้ตรงกับการรายงานพร้อมบริบทคล้ายบทอ่านเรื่องลงทะเล",
          "ข้อ ก เสนอคำสั่งออกแบบที่ไม่มีในเรื่อง ข้อ ข อ้างการโฆษณาและยี่ห้อที่ไม่ปรากฏ",
          "ข้อ ค เติม only ทั้งที่ยก sidewalks เป็นอีกปัจจัย"
        ]),
      quiz("q5", swimming, [2], "Select a balanced summary",
        "Passage: After the university expanded peak-hour bus service, student waiting times fell. Weekend frequency stayed unchanged, and the transport office is collecting more data. What is the best summary?",
        [
          "Extra peak-hour buses reduced waits, while weekend service remained the same and data collection is continuing.",
          "The university solved all transport problems, including weekend delays.",
          "Weekend buses were removed because the study was finished.",
          "Students waited longer because the office had no data."
        ], 0, [
          "ข้อ ก เก็บหลักฐานทั้ง fell, stayed unchanged และ is collecting โดยไม่เปลี่ยนเวลาและขอบเขต",
          "ข้อ ข ขยายผลเฉพาะ peak-hour ไปเป็นทุกปัญหา ข้อ ค เปลี่ยน unchanged เป็น removed และเปลี่ยน collecting เป็น finished",
          "ข้อ ง กลับทิศผลจาก fell เป็น longer และเพิ่มเหตุที่ไม่ระบุ"
        ])
    ],
    checklist: [
      "Skim แล้วอธิบายโครงและจุดประสงค์ของสองบทอ่าน พร้อมบอกหัวข้อที่จะกลับไป Scan",
      "ชี้ประโยคหลักฐานของ Hazard, Acute/Chronic และ Topical/Systemic และแยกคำศัพท์ออกจากตัวอย่างประกอบ",
      "จับคู่ตัวเลขงานวิจัยกับผลที่วัด หน่วย และกลุ่มเปรียบเทียบโดยไม่เติมข้อสรุปเกินหลักฐาน",
      "เขียน Short Summary โดยอ้างชื่อเรื่อง ถอด Thesis เลือก Key Points และเก็บคำแนะนำของผู้เขียน"
    ],
    coverage: [
      { pdf: pesticides, from: 1, to: 4, section: "pesticide-risk", topic: "ภาพรวม สูตร Hazard, Acute และ Chronic, ฉลากและ Table 1 ที่อ้างถึง" },
      { pdf: pesticides, from: 4, to: 6, section: "pesticide-symptoms", topic: "Topical, Systemic, อาการทั่วไป และหัวข้อ Seeking Medical Attention" },
      { pdf: pesticides, from: 6, to: 8, section: "pesticide-families", topic: "Fungicides, Insecticides, Synapse, Testing พร้อมระบุ Table 2 และ 4 ที่อ้างถึง" },
      { pdf: pesticides, from: 9, to: 10, section: "pesticide-prevention", topic: "Exposure, PPE สี่ช่องทาง และสรุปท้ายบทอ่าน" },
      { pdf: swimming, from: 1, to: 2, section: "sea-research", topic: "พาดหัว รูปประกอบ ตัวเลขงานวิจัย ตัวอย่างมลพิษ และคำกล่าวนักวิจัย" }
    ]
  });
})();
