from client.models import Person, Genetics


def analysis(JSHSHIR_1, JSHSHIR_2):
    person1 = Person.objects.filter(JSHSHIR=JSHSHIR_1).first()
    person2 = Person.objects.filter(JSHSHIR=JSHSHIR_2).first()

    genetic_all = []
    health_percentage = 100
    for genetic in Genetics.objects.all():
        genetic_name = genetic.name.title()

        m = person1.genotype.filter(genetics=genetic).first()
        n = person2.genotype.filter(genetics=genetic).first()

        appearance1 = list(m.appearance)
        appearance2 = list(n.appearance)

        q = []
        for i in appearance1:
            q.append(i + appearance2[0])
            q.append(i + appearance2[1])

        percentage = 0
        for i in q:
            if genetic.type.lower() * 2 == i:
                percentage += 1

        if percentage:
            health_percentage -= percentage / 4 * 100
            genetic_all.append(
                {
                    "name": genetic_name,
                    "y": percentage / 4 * 100
                }
            )

    genetic_all.append({
        "name": "Health",
        "y": health_percentage,
        "color": "#2ecc40"
    })
    return genetic_all
